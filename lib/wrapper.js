const { ServiceObjectError } = require('./errors')
const { ResultFailure, ResultBase } = require('./results')

/**
 * Wrapper class that manage the service
 */
class Wrapper {
  constructor(service) {
    this.service = service
  }

  raisableError() {
    return this.service.raisableError()
  }

  defaultResultData() {
    return this.service.defaultResultData()
  }

  async #servicePerform() {
    const result = await this.service.perform(...arguments)
    if(!(result instanceof ResultBase)) {
      throw new ServiceObjectError(`Return value of #perform must be a type of ${ResultBase.name}`)
    }
    return new result.constructor({ ...this.defaultResultData(), ...result._data }) 
  }

  async performUnsafe() {
    try {
      return await this.#servicePerform(...arguments)
    } catch(err) {
      throw new (this.raisableError())(err.message || err)
    }
  }

  async perform() {
    try {
      return await this.#servicePerform(...arguments)
    } catch(err) {
      const error = new (this.raisableError())(err.message || err)
      return new ResultFailure({ ...this.defaultResultData(), errors: [error] })
    }
  }
}

module.exports = Wrapper