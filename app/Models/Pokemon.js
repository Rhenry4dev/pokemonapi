'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Pokemon extends Model {
    types () {
        return this
            .hasMany('App/Models/Type')
            .pivotModel('App/Models/PokemonType')
    }
}

module.exports = Pokemon
