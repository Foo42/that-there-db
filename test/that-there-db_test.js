'use strict';

var Promise = require('promise');
var thatThereDb = require('../');

/*
    ======== A Handy Little Mocha Reference ========
    https://github.com/visionmedia/mocha/

    Test assertions:
        assert.fail(actual, expected, message, operator)
        assert(value, message), assert.ok(value, [message])
        assert.equal(actual, expected, [message])
        assert.notEqual(actual, expected, [message])
        assert.deepEqual(actual, expected, [message])
        assert.notDeepEqual(actual, expected, [message])
        assert.strictEqual(actual, expected, [message])
        assert.notStrictEqual(actual, expected, [message])
        assert.throws(block, [error], [message])
        assert.doesNotThrow(block, [message])
        assert.ifError(value)

        Apart from assert, Mocha allows you to use any of the following assertion libraries:
        - should.js
        - chai
        - expect.js
        - better-assert
*/

var assert = require('assert');

// post with just coords gives id.
// post wiht coords and data stores data as well as returning id

// put with id and coordinates moves any data stored with that id to new location
// put with id, coordinates and data replaces and moves data

// get with id returns {id, data, location}
// get with location and radius lists {id, data, location} objects


describe('That-There-Db', function(){
    var db;
    beforeEach(function(done){
        db = thatThereDb.create().then(function(newDb){
            db = newDb;
            done();
        });
    });

    describe('Storing items at a location', function(done){
        it('should return a promise resolving when the item has been stored when putting an id at a location', function(done){
            db.put('someItemId', {lat:0, lon:0}).then(done);
        });
    });

    describe('Retrieving items near a location', function(done){
        it('should return a stored object when getting items within a radius centred on that item', function(done){
            db
                .put('someItemId', {lat:0, lon:0})
                .then(function(){
                    db.get.within('1','km').of({lat:0, lon:0})
                        .then(function(items){
                            assert.equal(items[0].id, 'someItemId');
                            done();
                        }).catch(done);
                });  
        });

        it('should only return items within specified area', function(done){
            var putFirstItem = db.put('someCloseItem', {lat:90, lon:0.0001});
            var putSecondItem = db.put('someFarItemId', {lat:90, lon:30});

            Promise
                .all([putFirstItem, putSecondItem])
                .then(function(){return db.get.within(1,'km').of({lat:90, lon:0})})
                .then(function(items){
                    assert.equal(items.length, 1);
                    assert.equal(items[0].id, 'someCloseItem');
                    done();
            }).catch(done);
        });
        
    });
});
