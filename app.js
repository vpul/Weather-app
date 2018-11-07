const request = require('request');
const yargs = require('yargs');

var argv = yargs
    .options({
        a: {
            describe: "Address to fetch Weather for",
            demand: true,
            alias: 'address',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);

request({ 
    url: `https://nominatim.openstreetmap.org/search.php?q=${encodedAddress}&format=json`,
    json: true,         //This is included so that we don't have to manually parse JSON
    headers: {
        'User-Agent': 'request'   //This is important, otherwise OSM denies HTTP request.
    }
}, (error, response, body) => {
    if (error) {
        console.log("Unable to connect to OpenStreetMap Nominatim");
    } else if (body.length === 0) {
        console.log("Unable to find that address.");
    } else {
        for(var i in body) {
            console.log('--');
            console.log(`Address: ${body[i].display_name}`);
            console.log(`Latitude: ${body[i].lat}`);
            console.log(`Longitude: ${body[i].lon}`);
        }
    }
});