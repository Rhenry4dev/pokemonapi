'use strict'

const { Command } = require('@adonisjs/ace')
const got = use('got')
const Pokemon = use('App/Models/Pokemon')

class ImportPokemon extends Command {
  static get signature () {
    return 'import:pokemon'
  }

  static get description () {
    return 'Import pokemons using external API'
  }

  async handle (args, options) {

    const count = 151

    for ( var i = 1; i <= count; i++ ) {
      var url = 'https://pokeapi.co/api/v2/pokemon/' + i,
      response = await got(url),
      image = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' + ('000' + i).slice(-3) + '.png',
      evolvesFrom = null

      const pokemon = JSON.parse(response.body)

      url = 'https://pokeapi.co/api/v2/pokemon-species/' + i
      response = await got(url)

      const pokemonSpecie = JSON.parse(response.body)

      if (pokemonSpecie.evolves_from_species) {
        evolvesFrom = pokemonSpecie.evolves_from_species.url.split("/")[6]
      }

      var pokemonData = {
        'name': pokemon.name,
        'capture_rate': pokemonSpecie.capture_rate,
        'weight': pokemon.weight,
        'height': pokemon.height,
        'image': image,
        'has_gender_difference': pokemonSpecie.has_gender_differences,
        'evolves_from': evolvesFrom,
      }

      const pokemonCreated = Pokemon.create(pokemonData)

      console.log('Pokemon ' + pokemon.name + " was imported")
    }

    return console.log(count + ' pokemons imported')
  }
}

module.exports = ImportPokemon
