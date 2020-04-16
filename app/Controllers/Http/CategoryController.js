'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Category = use('App/Models/Category');
const Database = use('Database')
/**
 * Resourceful controller for interacting with categories
 */
class CategoryController {
  /**
   * Show a list of all categories.
   * GET categories
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
    const category = await Category.all()
    return view.render('category.index',{category:category.toJSON()})

  }

  /**
   * Render a form to be used for creating a new category.
   * GET categories/create
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
    return response.send(view.render('category.create'))
  }

  /**
   * Create/save a new category.
   * POST categories
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
    const category = new Category()
    category.category = request.input('category')

    await category.save()

    return response.route('category.index')
  }

  /**
   * Display a single category.
   * GET categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing category.
   * GET categories/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view, auth }) {
    const users = await auth.getUser();
    if(!auth.user){
      return response.redirect('/login')
    } else if (users.level !== 'Admin') {
      return response.redirect('/login')
    }
    const category = await Category.query().where('id', params.id).fetch()
    return view.render('category.edit',{category:category.toJSON()})
  }

  /**
   * Update category details.
   * PUT or PATCH categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth }) {
    const users = await auth.getUser();
    if(!auth.user){
      return response.redirect('/login')
    } else if (users.level !== 'Admin') {
      return response.redirect('/login')
    }
    const category = await Category.find(params.id)
    category.category = request.input('category')

    await category.save()
    return response.route('category.index')
  }

  /**
   * Delete a category with id.
   * DELETE categories/:id
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
    const category = await Category.find(params.id)
    await category.delete()

    return response.redirect('/category')
  }
}

module.exports = CategoryController
