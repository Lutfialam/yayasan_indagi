'use strict'

class LoginController {

  async index({ view, auth, response }) {
    if(auth.user){
      return response.redirect('/welcome')
    } 
    return view.render('auth.login')
  }

  async check({ request, auth, session, response }) {
    if(auth.user){
      return response.redirect('/welcome')
    } 
    /**
     * get data from form
     */
    const { email, password } = request.all()

    /**
     * attemp auth
     */
    await auth.attempt(email, password)

    return response.route('welcome')

  }

  async logout({ auth, response }) {
    await auth.logout()
    return response.route('home.index')
  }

}

module.exports = LoginController