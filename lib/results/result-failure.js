const ResultBase = require('./result-base')

class ResultFailure extends ResultBase {
  constructor() {
    super(false, arguments[0])
  }
}

module.exports = ResultFailure