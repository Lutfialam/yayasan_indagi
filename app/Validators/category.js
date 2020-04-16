'use strict'

class category {
  get rules () {
    return {
      category : 'required|unique:categories',
    }
  }

  get messages () {
    return {
      'judul.required': 'this column is required.',
      'judul.unique' : 'this category is exist'
    }
  }
}

module.exports = category
