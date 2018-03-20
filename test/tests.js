'use strict';

const chai = require('chai');
const expect = chai.expect;
const PromiseQueue = require('../');

describe('PromiseQueue', () => {

  it('Should resolve all items.', done => {
    const pq = new PromiseQueue(function* () {
      for(let i = 0; i < 10; i++) {
        yield new Promise(function(resolve, reject) {
          setTimeout(resolve, (Math.random()*10)+1);
        });
      }
    });

    let count = 0;
    pq.on('resolved', () => {
      count++;
    }).on('completed', () => {
      expect(count).to.eql(10);
      done();
    }).start();
  })

  it('Should reject all items.', done => {
    const pq = new PromiseQueue(function* () {
      for(let i = 0; i < 10; i++) {
        yield new Promise(function(resolve, reject) {
          setTimeout(reject, (Math.random()*10)+1);
        });
      }
    }, 100);

    let count = 0;
    pq.on('rejected', (res, index) => {
      count++;
    }).on('completed', () => {
      expect(count).to.eql(10);
      done();
    }).start();
  })
});
