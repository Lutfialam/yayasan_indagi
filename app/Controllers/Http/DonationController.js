'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Donation = use('App/Models/Donation');
const Category = use('App/Models/Category')
const Helpers = use('Helpers')
/**
 * Resourceful controller for interacting with donations
 */
class DonationController {
  /**
   * Show a list of all donations.
   * GET donations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view, auth }) {
    const users = await auth.getUser();
    if(!auth.user){
      return response.redirect('/login')
    } else if (users.level !== 'Admin') {
      return response.redirect('/login')
    }
    const donation = await Donation.query().with('category').fetch()
    return view.render('donation.index',{donation:donation.toJSON()})
  }

  /**
   * Render a form to be used for creating a new donation.
   * GET donations/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view, auth }) {
    if(!auth.user){
      return response.redirect('/login')
    }
    const category = await Category.all()
    return response.send(view.render('donation.create', {category:category.toJSON()}))
  }

  /**
   * Create/save a new donation.
   * POST donations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    if(!auth.user){
      return response.redirect('/login')
    }
    const donation = new Donation()
    donation.jenis_donasi = request.input('jenis_donasi')
    donation.berita = request.input('berita')
    donation.category_id = request.input('category_id')
    donation.user_id = auth.user.id
    const image = request.file('gambar', {
      types: ['image'],
      size: '10mb'
    })

    var dateObj = new Date();
    var month = dateObj.getMonth() + 1;
    var day = dateObj.getDate();
    var year = dateObj.getFullYear();
    var hours = dateObj.getHours()
    var minutes = dateObj.getMinutes()
    var seconds = dateObj.getSeconds()
    var milis = dateObj.getMilliseconds()

    var newdate = year + "-" + month + "-" + day + "-" + hours + ":" + minutes + "-" + seconds + "-" + milis;


    await image.move(Helpers.publicPath('uploads'), {
      name : 'Donation' + newdate + "-" + image.clientName,
      overwrite: true
    })
  
    if (!image.moved()) {
      return image.error()
    }

    donation.gambar = 'Donation' + newdate + "-" + image.clientName

    await donation.save()

    return response.route('donation.show', { id : auth.user.id })
  }

  /**
   * Display a single donation.
   * GET donations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view, auth }) {
    const donation = await Donation.query().where('user_id', params.id).with('category').fetch()
    console.log(donation)
    return response.send(view.render('donation.donation-detail', {donation:donation.toJSON()}))
  }

  /**
   * Render a form to update an existing donation.
   * GET donations/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update donation details.
   * PUT or PATCH donations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a donation with id.
   * DELETE donations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response, auth }) {
    const users = await auth.getUser();
    if(!auth.user){
      return response.redirect('/login')
    } else if (users.level !== 'Admin') {
      return response.redirect('/login')
    }
    const donation = await Donation.find(params.id)
    await donation.delete()

    return response.redirect('/donation')
  }

  async make_donation ({ request, response, view, auth }) {
    if(!auth.user){
      return response.redirect('/login')
    } 
    return view.render('donation.make_donation')
  }
}

module.exports = DonationController
