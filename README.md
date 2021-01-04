# simple-service-object
Simple service object pattern for javascript classes

## Installation
```
npm install simple-service-object
```

```
yarn install simple-service-object
```

## Example usage

Define a class that inherits from __ServiceObject__, the class must ***overwrite the perform() method***.

Optionally *defaultResultData()* and *raisableError()* could be overwritten to define a default behavior.
### Define a service class
```
const { ServiceObject, ResultSuccess, ResultFailure } = require('simple-service-object')

class MyErrorClass extends Error { }

class MyService extends ServiceObject {
  defaultResultData() {
    return { hello: 'world' }
  }

  raisableError() {
    return MyErrorClass
  }

  perform(objectType) {
    // Service logic...
    switch(objectType) {
      case 'serviceObject': {
        return new ResultSuccess({ foo: 'bar' })
      }
      case 'simpleObject': {
        return new ResultFailure({ errorParam: 'simple object' })
      }
      case 'badObject': {
        throw 'bad object'
      }
      default: {
        return new ResultSuccess()
      }
    }
  }
}

module.exports = MyService
```
## Call the service
```
let myService = MyService.perform()
myService.success // true
myService.hello // world

myService = MyService.perform('serviceObject')
myService.success // true
myService.foo // bar
myService.hello // world
myService.failure // false

myService = MyService.perform('simpleObject')
myService.failure // true
myService.errorParam // simple object
myService.success // false

myService = MyService.perform('badObject')
myService.failure // true
myService.errors[0] // MyErrorClass: bad object ...
myService.errors[0].message // bad object

// performUnsage will throw the exception
myService = MyService.performUnsafe('badObject') // Uncaught MyErrorClass: is a bad object
```

This library was inspired by Aldous gem https://github.com/envato/aldous
