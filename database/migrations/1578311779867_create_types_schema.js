'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateTypesSchema extends Schema {
  up () {
    this.create('types', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.timestamps()
    })

    this.create('pokemon_types', (table) => {
      table.increments()
      table
      .integer('type_id')
      .unsigned()
      .references('id')
      .inTable('types')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table
      .integer('pokemon_id')
      .unsigned()
      .references('id')
      .inTable('pokemons')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('types')
    this.drop('pokemon_types')
  }
}

module.exports = CreateTypesSchema
