'use strict'

const { Command } = require('@adonisjs/ace')
const got = use('got')
const Type = use('App/Models/Type')

class ImportPokemonTypes extends Command {
  static get signature () {
    return 'import:types'
  }

  static get description () {
    return 'Import pokemons types using external API'
  }

  async handle (args, options) {

    const count = 16

    for ( var i = 1; i <= count; i++ ) {
      var url = 'https://pokeapi.co/api/v2/type/' + i,
        response = await got(url),
        pokemonIds = []

      const type = JSON.parse(response.body)

      for (var t = 0; t <= type.pokemon.length; t++) {
        if (type.pokemon[t])
          if (type.pokemon[t].pokemon.url.split("/")[6] < 151)
            pokemonIds.push(type.pokemon[t].pokemon.url.split("/")[6])
      }

      var typeModel = await Type.find(i)

      typeModel.pokemons().attach(pokemonIds)

      console.log('The type ' + type.name + " was imported")
    }

    return console.log(count + ' types imported')
  }
}

module.exports = ImportPokemonTypes
