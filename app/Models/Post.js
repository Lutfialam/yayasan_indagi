'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {
    static boot () {
        super.boot()

        this.addTrait('@provider:Lucid/Slugify', {
            fields: { url: 'url' },
            strategy: 'dbIncrement'
        })
    }
    
    category () {
        return this.belongsTo('App/Models/Category')
    }

    Donation () {
        return this.belongsTo('App/Models/Donation')
    }
}

module.exports = Post
