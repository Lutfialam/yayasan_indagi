'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DonationSchema extends Schema {
  up () {
    this.create('donations', (table) => {
      table.increments()
      table.string('jenis_donasi')
      table.string('berita')
      table.string('gambar')
      table.integer('category_id')
      table.integer('user_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('donations')
  }
}

module.exports = DonationSchema
