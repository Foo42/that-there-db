var Promise = require('promise');
var geolib = require('geolib');


module.exports.create = function(){
  var items = [];
  function createGeoLibPoint(consisePoint){
    return {longitude:consisePoint.lon, latitude: consisePoint.lon}
  }
  return new Promise(function(resolve){
    var db = {
        put: function(id, location){return new Promise(function(resolve){
                items.push({id:id, location:location});
            resolve();
        });},
        get:{within:function(radius, units){
                var thresholdMeters = units == 'km' ? radius*1000 : radius; 
            return {
                of:function(location){
                    return new Promise(function(resolve){
                        var filteredList = items.filter(function(item){
                            var distance = geolib.getDistance(createGeoLibPoint(item.location), createGeoLibPoint(location));
                            return distance <= thresholdMeters;
                        });
                        resolve(filteredList);
                    });
                }
            }
       }} 
    };
    resolve(db);
  });
}
