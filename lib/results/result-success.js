const ResultBase = require('./result-base')

class ResultSuccess extends ResultBase {
  constructor() {
    super(true, arguments[0])
  }
}

module.exports = ResultSuccess