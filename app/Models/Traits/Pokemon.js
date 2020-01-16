'use strict'

const Env = use('Env')

class Pokemon {
  register (Model) {
    const func = Model.prototype

    func.getURLDetail = function () {
      return Env.getOrFail('APP_URL') + '/pokemon/' + this.id
    }

    func.isEvolve = function () {
      return this.evolves_from == null ? false : true
    }

    func.evolvesFrom = function () {
      return Env.getOrFail('APP_URL') + '/pokemon/' + this.evolves_from
    }
  }
}

module.exports = Pokemon
