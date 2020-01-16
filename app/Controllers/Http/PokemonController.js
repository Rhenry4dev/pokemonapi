'use strict'

const Pokemon = use('App/Models/Pokemon')
const PokemonTransformer = use('App/Transformers/PokemonTransformer')


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with pokemons
 */
class PokemonController {
  /**
   * Show a list of all pokemons.
   * GET pokemons
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Transform} ctx.transform
   */
  async index ({ request, transform }) {

    const pokemons = await Pokemon.query().setVisible(['id', 'name']).paginate(request.get().page, request.get().limit);

    return transform.paginate(pokemons, 'PokemonTransformer.withURL');
  }

  /**
   * Display a single pokemon.
   * GET pokemons/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show ({ params, transform }) {
    const pokemon = await Pokemon.findOrFail(params.id)

    return transform.item(pokemon, 'PokemonTransformer.withDetails');
  }
}

module.exports = PokemonController
