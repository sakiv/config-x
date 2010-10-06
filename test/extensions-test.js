/*******************************************************************************
* extensions-test.js - Test for the extensions functionality
********************************************************************************
*/

// Dependencies
require('../lib/extensions');
var vows = require('../deps').vows;
var assert = require('assert');

/*******************************************************************************
* ExtensionsTest
********************************************************************************
*/
exports.ExtensionsTest = vows.describe('Underscore.js Extensions').addBatch({
  'Library initialization': {
    'Underscore library is globally available': function() {
      assert.isFunction(_);
    }
  },

  'Extended _.isObject() tests': {
    'The function exists in the Underscore library': function() {
      assert.isFunction(_.isObject);
    },
    'Correctly identifies objects': function() {
   	  assert.isTrue(_.isObject({A:"b"}));
    },
    'Correctly excludes non-objects': function() {
   	  assert.isFalse(_.isObject("some string"));
   	  assert.isFalse(_.isObject(45));
   	  assert.isFalse(_.isObject([2, 3]));
   	  assert.isFalse(_.isObject(["a", "b"]));
    }
  },

  'Extended _.cloneDeep() tests': {
    topic: function() {
      // Return an object for copy tests
      return {
        elem0:true,
        elem1:"Element 1",
        elem2:2,
        elem3:[1,2,3],
        elem4:function(){return "hello";},
        elem5:{sub1:"sub 1",sub2:2,sub3:[1,2,3]}
      };
    },
    'The function exists in the Underscore library': function() {
      assert.isFunction(_.cloneDeep);
    },
    'Original and copy should test equivalent (deep)': function(orig) {
      var copy = _.cloneDeep(orig);
      assert.deepEqual(copy, orig);
    },
    'The objects should be different': function(orig) {
      var copy = _.cloneDeep(orig);
      copy.elem1 = false;
      assert.notDeepEqual(copy, orig);
    },
    'Arrays should be copied by value, not by reference': function(orig) {
      var copy = _.cloneDeep(orig);
      assert.deepEqual(copy, orig);
      copy.elem3[0] = 2;
      // If the copy wasn't deep, elem3 would be the same object
      assert.notDeepEqual(copy, orig);
    },
    'Objects should be copied by value, not by reference': function(orig) {
      var copy = _.cloneDeep(orig);
      copy.elem5.sub2 = 3;
      assert.notDeepEqual(copy, orig);
      copy = _.cloneDeep(orig);
      copy.elem5.sub3[1] = 3;
      assert.notDeepEqual(copy, orig);
    }
  },

  'Extended _.extendDeep() tests': {
    'The function exists in the Underscore library': function() {
      assert.isFunction(_.extendDeep);
    },
    'Performs normal extend': function() {
      var orig = {elem1:"val1", elem2:"val2"};
      var extWith = {elem3:"val3"};
      var shouldBe = {elem1:"val1", elem2:"val2", elem3:"val3"};
      assert.deepEqual(_.extendDeep(orig, extWith), shouldBe);
    },
    'Replaces non-objects': function() {
      var orig = {elem1:"val1", elem2:["val2","val3"],elem3:{sub1:"val4"}};
      var extWith = {elem1:1,elem2:["val4"],elem3:"val3"};
      var shouldBe = {elem1:1, elem2:["val4"],elem3:"val3"};
      assert.deepEqual(_.extendDeep(orig, extWith), shouldBe);
    },
    'Merges objects': function() {
      var orig = {e1:"val1", elem2:{sub1:"val4",sub2:"val5"}};
      var extWith = {elem2:{sub2:"val6",sub3:"val7"}};
      var shouldBe = {e1:"val1", elem2:{sub1:"val4",sub2:"val6",sub3:"val7"}};
      assert.deepEqual(_.extendDeep(orig, extWith), shouldBe);
    }
  },

  'Extended _.out() and ._outStr() tests': {
    'The functions exist in the Underscore library': function() {
      assert.isFunction(_.out);
      assert.isFunction(_.outStr);
    },
    // All tests use outStr as a proxy for out().  They don't print headings...
    'Can be called with a simple string': function() {
      var shouldBe = "The value is 23";
      assert.equal(_.outStr("The value is " + 23), shouldBe);
    },
    'Can be called with just an object': function() {
      var obj = {e1:"val1", elem2:{sub1:"val4",sub2:["val6a", 62],sub3:"val7"}};
      var shouldBe = "{\n    e1: 'val1',\n    elem2: {\n        sub1: 'val4',\n        sub2: [ 'val6a', 62 ],\n        sub3: 'val7'\n    }\n}";
      assert.equal(_.outStr(obj), shouldBe);
    },
    'Can be called with an object label': function() {
      var obj = {e1:"val1", elem2:{sub1:"val4",sub2:["val6a", 62]}};
      var shouldBe = "{\n    e1: 'val1',\n    elem2: {\n        sub1: 'val4',\n        sub2: [ 'val6a', 62 ]\n    }\n}";
      assert.equal(_.outStr("Test object", obj), shouldBe);
    },
    'Can be called with a specified depth': function() {
      var obj = {e1:"val1", elem2:{sub1:"val4",sub2:["val6a", 62]}};
      var shouldBe = "{\n    e1: 'val1',\n    elem2: {\n        sub1: 'val4',\n        sub2: [ 'val6a', 62 ]\n    }\n}";
      assert.equal(_.outStr("Depth of 20", obj, 20), shouldBe);
    },
    'Can be called with a boolean depth (deep)': function() {
      var obj = {e1:"val1"};
      var shouldBe = "{ e1: 'val1' }";
      assert.equal(_.outStr("Deep", obj, true), shouldBe);
    }
  }

});