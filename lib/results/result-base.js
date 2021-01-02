/**
 * Manage the result of the service, this class assign the object first argument as properties
 */
class ResultBase {
  #_success
  #_data = {}

  constructor(success, objectResult) {
    this.#_success = success
    if(!!objectResult) {
      this.#_data = objectResult
      Object.defineProperties(this, Object.getOwnPropertyDescriptors(objectResult))
    }
  }

  get _data() {
    return this.#_data
  }

  get success() {
    return !!this.#_success
  }

  get failure() {
    return !this.#_success
  }
}

module.exports = ResultBase