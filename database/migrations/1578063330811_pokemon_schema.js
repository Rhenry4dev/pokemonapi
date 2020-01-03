'use strict'

/** @type { import('@adonisjs/lucid/src/Schema') } */

const Schema = use('Schema')

class PokemonSchema extends Schema {
  up () {
    this.create('pokemons', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('capture_rate').notNullable()
      table.string('weight').notNullable()
      table.string('height').notNullable()
      table.string('image').notNullable()
      table.string('has_gender_difference').notNullable()
      table
        .integer('evolves_from')
        .unsigned()
        .references('id')
        .inTable('pokemons')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('pokemons')
  }
}

module.exports = PokemonSchema
