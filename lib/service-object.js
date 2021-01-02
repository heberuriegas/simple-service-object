const { ServiceObjectError } = require('./errors')
const Wrapper = require('./wrapper')

/**
 * Main service object class, manage the static perform action
 */
class ServiceObject {
  static build() {
    return new Wrapper(new this(...arguments))
  }
  
  static performUnsafe() {
    return this.build(...arguments).performUnsafe(...arguments)
  }

  static perform() {
    return this.build(...arguments).perform(...arguments)
  }

  perform() {
    throw `${this.constructor.name} must implement method #perform`
  }

  raisableError() {
    return ServiceObjectError
  }

  defaultResultData() {
    return {}
  }
}

module.exports = ServiceObject