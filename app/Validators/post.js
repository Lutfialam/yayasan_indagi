'use strict'

class post {
  get rules () {
    return {
      judul : 'required',
      isi_post : 'required'
    }
  }

  get messages () {
    return {
      'judul.required': 'this column is required.',
      'isi_post.required': 'this column is required.'
    }
  }
}

module.exports = post
