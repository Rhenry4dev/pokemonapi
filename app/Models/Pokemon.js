'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Pokemon extends Model {

    static boot () {
        super.boot()
        this.addTrait('Pokemon')
    }

    types () {
        return this
        .hasMany('App/Models/Type')
        .pivotModel('App/Models/PokemonType')
    }
}

module.exports = Pokemon
