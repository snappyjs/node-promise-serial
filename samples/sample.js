'use strict';

const PromiseSerial = require('../');

/**
 * Function generator to yield the Promises that should be executed in serial.
 */
function* promiseGenerator() {
  for(let i = 0; i < 10; i++) {
    yield fetch(`http://snappyjs.com/id/${i}`);
  }
}

// Create a new PromiseSerial using a promise generator and a wait-time of 100ms
const ps = new PromiseSerial(promiseGenerator, 100);

ps.on('resolved', (res, index) => {
  console.log(`Got resolved promise-results: ${res} with index: ${index}`);
}).on('rejected', (res, index) => {
  console.log(`Promise with index ${index} was rejected.`);
}).on('completed', () => {
  console.log(`All promises have been either resolved or rejected.`);
});
