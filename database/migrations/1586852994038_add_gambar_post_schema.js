'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddGambarPostSchema extends Schema {
  up () {
    this.table('posts', (table) => {
      table.string('gambar')
    })
  }

  down () {
    this.table('add_gambar_posts', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AddGambarPostSchema
