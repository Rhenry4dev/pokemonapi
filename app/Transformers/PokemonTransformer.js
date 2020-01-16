'use strict'

const Env = use('Env')
const BumblebeeTransformer = use('Bumblebee/Transformer')

/**
 * PokemonTransformer class
 *
 * @class PokemonTransformer
 * @constructor
 */
class PokemonTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
      id: model.id,
      name: model.name
    }
  }

  includeType (model) {
    return this.item(model.getRelated('types'), TypeTransformer)
  }

  transformWithDetails (model) {
    return {
      ...this.transform(model),
      weight: model.weight,
      height: model.height,
      has_gender_difference: model.has_gender_difference,
      evolves_from: model.isEvolve() ? model.evolvesFrom() : undefined,
      is_evolve: model.isEvolve()
    }
  }

  transformWithURL (model) {
    return {
      ...this.transform(model),
      url: model.getURLDetail()
    }
  }
}

module.exports = PokemonTransformer
