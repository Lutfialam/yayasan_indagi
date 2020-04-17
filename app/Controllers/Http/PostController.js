'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Post = use('App/Models/Post');
const Category = use('App/Models/Category');
const Helpers = use('Helpers')
const { validate } = use('Validator')



/**
 * Resourceful controller for interacting with posts
 */
class PostController {
  /**
   * Show a list of all posts.
   * GET posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view, auth }) {
    if(!auth.user){
      return response.redirect('/login')
    }
    const post = await Post.query().with('category').fetch()
    return response.send(view.render('post.index', {post:post.toJSON()}))
  }

  /**
   * Render a form to be used for creating a new post.
   * GET posts/create
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
    const category = await Category.all()
    return response.send(view.render('post.create', {category:category.toJSON()}))
  }

  /**
   * Create/save a new post.
   * POST posts
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
    const image = request.file('gambar', {
      types: ['image'],
      size: '10mb'
    })

    const post = new Post()
    post.judul = request.input('judul')
    post.isi_post = request.input('isi_post')
    post.category_id = request.input('category_id')
    post.user_id = auth.user.id

    var dateObj = new Date();
    var month = dateObj.getMonth() + 1;
    var day = dateObj.getDate();
    var year = dateObj.getFullYear();
    var hours = dateObj.getHours()
    var minutes = dateObj.getMinutes()
    var seconds = dateObj.getSeconds()
    var milis = dateObj.getMilliseconds()

    var newdate = year + "-" + month + "-" + day + "-" + hours + ":" + minutes + "-" + seconds + "-" + milis;

    const url = request.input('judul')
    const new_url = url + "-"  + newdate

    await image.move(Helpers.publicPath('uploads'), {
      name : 'post' + newdate + "-" + image.clientName,
      overwrite: true
    })
  
    if (!image.moved()) {
      return image.error()
    }

    post.url = new_url
    post.gambar = 'post' + newdate + "-" + image.clientName

    await post.save()

    return response.route('post.index')
  }

  /**
   * Display a single post.
   * GET posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing post.
   * GET posts/:id/edit
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
    const category = await Category.all()
    const post = await Post.query().with('category').where('id', params.id).fetch()
    return view.render('post.edit',{post:post.toJSON(), category:category.toJSON()})
  }

  /**
   * Update post details.
   * PUT or PATCH posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, session }) {
    const post = await Post.find(params.id)
    post.judul = request.input('judul')
    post.isi_post = request.input('isi_post')
    post.category_id = request.input('category_id')
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

    const url = request.input('judul')
    const new_url = url + "-"  + newdate

    await image.move(Helpers.publicPath('uploads'), {
      name : 'post' + newdate + "-" + image.clientName,
      overwrite: true
    })
  
    if (!image.moved()) {
      return image.error()
    }

    post.gambar = 'post' + newdate + "-" + image.clientName

    await post.save()
    session.flash({ update: 'update Berhasil!' })
    return response.route('post.index')
  }

  /**
   * Delete a post with id.
   * DELETE posts/:id
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
    const post = await Post.find(params.id)
    await post.delete()

    return response.redirect('/post')
  }

  async detail_post ({ params, request, response, view, session }) {
    const post = await Post.query().where('url', params.url).with('category').fetch()
    session.flash({ Delete: 'Delete Berhasil!' })
    return response.send(view.render('post.detail_post', {post:post.toJSON()}))
  }
}

module.exports = PostController
