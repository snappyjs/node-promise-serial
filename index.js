'use strict';

const EventEmitter = require('events');
const assert = require('assert');

const EVENTS = {
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
  COMPLETED: 'completed'
}

/**
 * Utility class to use a generator to 'queue' Promises.
 * [waitTime]ms can be used to set a specific time between each new Promise start.
 *
 * The object extends the EventEmitter class and emits on:
 *
 *  'resolved' - successfully resolved Promise.
 *  'rejected' - Promise was rejected.
 *  'completed' - The iterator (generator) is done.
 * @extends EventEmitter
 */
class PromiseQueue extends EventEmitter {

  /**
   * Create a new PromiseQueue using a generator and optionally a wait-time between
   * each new Promise start.
   * @param {function*} generator    function* that yields promises to be used.
   * @param {Number} [waitTime=0] Time in ms to wait between each new Promies start.
   */
  constructor(generator, waitTime=0) {
    super();
    assert.equal(typeof generator, 'function', '[generator] needs to be a generator function.');
    assert.equal(Number.isInteger(waitTime), true, '[waitTime] needs to be a an integer.')

    this._generator = generator();
    this._waitTime = waitTime;
    this._running = 0;
    this._index = 0;
  }

  /**
   * PRIVATE
   * Get the next Promise from the iterator.
   */
  _next() {
    const it = this._generator.next();
    if(!it.done) {
      this._running++;
      it.value.then(res => {
        this.emit(EVENTS.RESOLVED, res, this._index++);
        this._running--;
        this._wait().then(() => this._next());
      }).catch(err => {
        this.emit(EVENTS.REJECTED, err, this._index++);
        this._running--;
        this._wait().then(() => this._next());
      });
    } else {
      this.emit(EVENTS.COMPLETED);
    }
  }

  /**
   * PRIVATE
   * Wait a specific time in ms before resolving promise.
   */
  _wait() {
    return new Promise(resolve => {
      setTimeout(resolve, this._waitTime);
    });
  }

  /**
   * Start running the generator and perform the Promises
   * yielded by it.
   * @return {this}
   */
  start() {
    this._next();
    return this;
  }
}
module.exports = PromiseQueue;
