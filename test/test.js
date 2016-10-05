'use strict';

const queryJson = require('../index.js');
const assert = require('assert');
const fs = require('fs');

describe('Query Json Test', function() {

  let json;

  before(function(done) {
    json = JSON.parse(fs.readFileSync(__dirname + '/resources/simple.json'));
    done();
  });

  describe('Query String', function() {
    it('Simple', function(done) {

      const regex = new RegExp('MIN', 'i');
      const result = queryJson.search(json, regex);

      assert.equal(result.length, 2);
      assert.deepEqual(result[0], [ 'properties', 'year', 'min' ]);
      assert.deepEqual(result[1], [ 'properties', 'features', 'minItems' ]);

      done();
    });

    it('Detailed', function(done) {

      const regex = new RegExp('MIN', 'i');
      const result = queryJson.search(json, regex, {
        details: true
      });

      assert.equal(result.length, 2);

      assert.equal(result[0].isKey, true);
      assert.deepEqual(result[0].path, [ 'properties', 'year', 'min' ]);

      assert.equal(result[1].isKey, true);
      assert.deepEqual(result[1].path, [ 'properties', 'features', 'minItems' ]);

      done();
    });
  });

  describe('Query boolean', function() {
    it('Simple', function(done) {

      const regex = new RegExp('false', 'i');
      const result = queryJson.search(json, regex);

      assert.equal(result.length, 3);
      assert.deepEqual(result[0], [ 'properties', 'color', 'options', '1', 'metallic' ]);
      assert.deepEqual(result[1], [ 'properties', 'features', 'uniqueItems' ]);
      assert.deepEqual(result[2], [ 'properties', 'engine', 'properties', 'displacement', 'required' ]);

      done();
    });

    it('Detailed', function(done) {

      const regex = new RegExp('false', 'i');
      const result = queryJson.search(json, regex, {
        details: true
      });

      assert.equal(result.length, 3);

      assert.equal(result[0].isKey, false);
      assert.deepEqual(result[0].path, [ 'properties', 'color', 'options', '1', 'metallic' ]);

      assert.equal(result[1].isKey, false);
      assert.deepEqual(result[1].path, [ 'properties', 'features', 'uniqueItems' ]);

      assert.equal(result[2].isKey, false);
      assert.deepEqual(result[2].path, [ 'properties', 'engine', 'properties', 'displacement', 'required' ]);

      done();
    });
  });

  describe('Query array', function() {
    it('Simple', function(done) {

      const regex = new RegExp('blue', 'i');
      const result = queryJson.search(json, regex);

      assert.equal(result.length, 1);
      assert.deepEqual(result[0], [ 'properties', 'color', 'options', '2', 'painting' ]);

      done();
    });

    it('Detailed', function(done) {

      const regex = new RegExp('blue', 'i');
      const result = queryJson.search(json, regex, {
        details: true
      });

      assert.equal(result.length, 1);

      assert.equal(result[0].isKey, false);
      assert.deepEqual(result[0].path, [ 'properties', 'color', 'options', '2', 'painting' ]);

      done();
    });
  });

  describe('Search unexisting value', function() {
    it('Simple', function(done) {

      const regex = new RegExp('green', 'i');
      const result = queryJson.search(json, regex);

      assert.equal(result.length, 0);

      done();
    });

    it('Detailed', function(done) {

      const regex = new RegExp('green', 'i');
      const result = queryJson.search(json, regex, {
        details: true
      });

      assert.equal(result.length, 0);

      done();
    });
  });
});
