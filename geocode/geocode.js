const request = require('request');

var geocodeAddress = (address, callback) => {
    var encodedAddress = encodeURIComponent(address);

    request({
        url: `https://nominatim.openstreetmap.org/search.php?q=${encodedAddress}&format=json`,
        json: true,         //This is included so that we don't have to manually parse JSON
        headers: {
            'User-Agent': 'request'   //This is important, otherwise OSM denies HTTP request.
        }
    }, (error, response, body) => {
        if (error) {
            callback("Unable to connect to OpenStreetMap Nominatim");
        } else if (body.length === 0) {
            callback("Unable to find that address.");
        } else {
            var geocodedAddressArray = [];
            for (var i in body) {
                geocodedAddressArray.push({
                    address: body[i].display_name,
                    latitude: body[i].lat,
                    longitude: body[i].lon
                });
            }
            callback(undefined, geocodedAddressArray);
        }
    });
};

module.exports = {
    geocodeAddress
};