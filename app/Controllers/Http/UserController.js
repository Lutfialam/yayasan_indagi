'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const User = use('App/Models/User');
const Database = use('Database')
/**
 * Resourceful controller for interacting with users
 */
class UserController {
  
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view, auth }) {
    const users = await auth.getUser();
    console.log(users.level)
    if(!auth.user){
      return response.redirect('/login')
    } else if (users.level !== 'Admin') {
      return response.redirect('/login')
    }
    const user = await User.all()
    return response.send(view.render('user.index',{user:user.toJSON()}))
  }

  /**
   * Render a form to be used for creating a new user.
   * GET users/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view, auth }) {
    const users = await auth.getUser();
    if(!auth.user){
      return response.redirect('/login')
    } else if (users.level !== 'Admin') {
      return response.redirect('/login')
    }
    return response.send(view.render('user.create'))
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const users = await auth.getUser();
    if(!auth.user){
      return response.redirect('/login')
    } else if (users.level !== 'Admin') {
      return response.redirect('/login')
    }
    const user = new User()
    user.name = request.input('name')
    user.email = request.input('email')
    user.password = request.input('password')
    user.level = request.input('level')

    await user.save()

    return response.route('user.index')
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view, auth }) {
    if(!auth.user){
      return response.redirect('/login')
    }
    const users = await User.query().where('id', params.id).fetch()
    return view.render('user.show',{users:users.toJSON()})
  }

  /**
   * Render a form to update an existing user.
   * GET users/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
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
    const user = await User.find(params.id)
    await user.delete()

    return response.redirect('/user')
  }

  async relawan ({ request, response, view, auth }) {
    const users = await auth.getUser();
    if(!auth.user){
      return response.redirect('/login')
    } else if (users.level !== 'Admin') {
      return response.redirect('/login')
    }
    return response.send(view.render('user.relawan'))
  }

  async relawan_create ({ request, response, auth }) {
    const users = await auth.getUser();
    if(!auth.user){
      return response.redirect('/login')
    } else if (users.level !== 'Admin') {
      return response.redirect('/login')
    }
    const user = new User()
    user.name = request.input('name')
    user.email = request.input('email')
    user.password = request.input('password')
    user.level = request.input('level')

    await user.save()

    return response.route('user.index')
  }
}

module.exports = UserController
