# simple-service-object
Simple service object pattern for javascript classes

## Description
As quoted by: https://crushlovely.com/journal/7-patterns-to-refactor-javascript-applications-service-objects/

>Service Objects are objects that perform a discrete operation or action. When a process becomes complex, hard to test, or touches more than one type of model, a Service Object can come in handy for cleaning up your code base.
>
> The goal of a Service Object is to isolate an operation, and should aim to follow these principles:
>
> - Strict with input and output. Service Objects should be designed to handle a very specific process so we can forego the Robustness Principle in favor of creating a tool for a very discrete purpose.  
> - Documented thoroughly. This module will be extracted out of the place it's being executed, therefore it's even more imperative that the object's intent and use be well-explained.
> - Terminates after operation is complete. This pattern should not be conflated with a worker process, which could set an interval, listen for web socket messages continuously, or some other operation to which there is no immediate end. Service Objects should be invoked, perform their immediate operations (whether synchronous or asynchronous), and terminate.

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
