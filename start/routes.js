'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('welcome').render('welcome')
Route.get('register', 'Auth/RegisterController.index').as('register.index')
Route.post('register', 'Auth/RegisterController.store').as('register.store')

Route.get('login', 'Auth/LoginController.index').as('login.index')
Route.post('login', 'Auth/LoginController.check').as('login.check')
Route.get('logout', 'Auth/LoginController.logout').as('logout')

Route.get('/', 'HomeController.index').as('home.index')
Route.resource('donation', 'DonationController')
Route.resource('user', 'UserController')
Route.resource('post', 'PostController')
    .validator(new Map([
        [['post.store'], ['post']]
    ]))
Route.resource('category', 'CategoryController')
    .validator(new Map([
        [['category.store'], ['category']]
    ]))

Route.get('/how-to-donate', 'DonationController.make_donation').as('donation.make_donation')
Route.get('/detail-post/:url', 'PostController.detail_post').as('post.detail_post')