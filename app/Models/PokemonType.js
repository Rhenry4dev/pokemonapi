const Model = use('Model')

class PokemonType extends Model {
    static get table () {
        return 'pokemon_types'
    }
}

module.exports = PokemonType