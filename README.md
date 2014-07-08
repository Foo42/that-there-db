# that-there-db [![Build Status](https://secure.travis-ci.org/foo42/that-there-db.png?branch=master)](http://travis-ci.org/foo42/that-there-db)

Datastructure for storing tokens at locations. Probably the best use case (and the one it was created for) is to store keys at locations, say user ids, then query for other nearby keys. Once nearby keys are found, they can be resolved to something moreuseful in application code using some sort of key value db. Some sort of value storage may be added to That-There-Db in the future.

Note that this module was created because I had need of such a thing and had a fairly clear idea of the interface I wanted, but don't need to be too concerned with the implementation / performance until later. Thus the current implementation uses the most naive approach.
## Project Status
Do not use this in production - it's nowhere near production ready. If you really want to use it, please submit a pull request with a more thoughtful and performant impelementation, then we can all use it. If the project I created this for ever gets going, I may return to implement a serious back end (maybe using mongo's geo features), but don't rely on it.
## Getting Started
Install the module with: `npm install that-there-db`

```javascript
var that-there-db = require('that-there-db');
that-there-db.awesome(); // "awesome"
```

## Documentation
_(Coming soon)_

## Examples
`var thatThereDb = require('that-there-db');
thatThereDb.createDb().then(function(db){
   db.put('someId', {lat:30,lon:0}).then(function(){
      db.get.within(10000).metersOf({lat:30,lon:0.000001});
   });
});
`



## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
- **v0.0.1**, *TBD*
    - Big Bang
    
## License
Copyright (c) 2014 Julian Haeger. Licensed under the MIT license.
