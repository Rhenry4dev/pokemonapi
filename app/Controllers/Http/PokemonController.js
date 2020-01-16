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
   * Create/save a new pokemon.
   * POST pokemons
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request }) {
    const data = request.only(['name', 'height', 'weight', 'has_gender_difference', 'capture_rate', 'evolves_from' , 'image'])
    const pokemon = await Pokemon.create(data)

    return pokemon
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

  /**
   * Update pokemon details.
   * PUT or PATCH pokemons/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a pokemon with id.
   * DELETE pokemons/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = PokemonController
