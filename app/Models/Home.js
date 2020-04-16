'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Home extends Model {
    category () {
        return this.belongsTo('App/Models/Category')
    }
}

module.exports = Home
