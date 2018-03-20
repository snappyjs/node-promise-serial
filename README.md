# node-promise-serial
> Queue up your Promises to be executed in sequence. Also supports wait-time between Promise executions.

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads Stats][npm-downloads]][npm-url]

Promise queue to execute promises in a serial fashion with an optional wait-time between the executions.

## Installation

OS X, Windows & Linux

```sh
npm install node-promise-serial --save
```

## Usage example

Simple usage with `function*` to queue up promises to be executed in serial.
```sh
  const PromiseQueue = require('promise-queue');

  // Example generator function to create Promises to be executed by the queue.
  // This could be yielding any type of Promise (e.g. request-promise)

  function* promiseGenerator() {
    for(let i = 0; i < 10; i++) {
      yield new Promise(resolve => {
        setTimeout(resolve, (Math.random()*100)+1);
      });
    }
  }

  const pq = new PromiseQueue(promiseGenerator, 100);

  // Listen on the events emitted from the PromiseQueue.
  //  'resolved' - successfully resolved promise.
  //  'rejected' - the Promise was rejected.
  //  'completed' - the generator is completed (no new Promises to consume)

  pq.on('resolved', res => {
    console.log(`Result that was resolved: ${res}`)
  }).on('rejected', err => {
    console.log(`Error occured: ${err}`);
  }).on('completed', () => {
    console.log('Generator is completed.');
  });  


```

_For a complete tutorial on how this was created have a look at my blog: https://www.snappyjs.com_

## Development setup

Describe how to install all development dependencies and how to run an automated test-suite of some kind. Potentially do this for multiple platforms.

```sh
npm install node-promise-serial --save
npm test
```

## Release History

* 1.0.0
    * RELEASE: Initial release.

## Meta

Tommy Dronkers –
Twitter: [@snappyJS](https://twitter.com/snappyjs) –
E-mail: tommy@snappyjs.com
Homepage: https://www.snappyjs.com

Distributed under the MIT license. See ``LICENSE`` for more information.

[https://github.com/snappyjs/node-promise-serial](https://github.com/snappyjs/node-promise-serial)

## Contributing

1. Fork it (<https://github.com/snappyjs/node-promise-serial/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

<!-- Markdown link & img dfn's -->
[npm-image]:
[![node](https://img.shields.io/node/v/passport.svg)](https://www.npmjs.com/package/express)

[npm-url]: https://npmjs.org/package/datadog-metrics
[npm-downloads]: https://img.shields.io/npm/dm/datadog-metrics.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/dbader/node-datadog-metrics
[wiki]: https://github.com/yourname/yourproject/wiki
