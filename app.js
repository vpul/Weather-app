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

console.log(argv.address);
var encodedAddress = encodeURIComponent(argv.address);

request({ 
    url: `https://nominatim.openstreetmap.org/search.php?q=${encodedAddress}&format=json`,
    json: true,
    headers: {
        'User-Agent': 'request'
    }
}, (error, response, body) => {
    for (var i in body) {
        console.log('--');
        console.log(`Address: ${body[i].display_name}`);
        console.log(`Latitude: ${body[i].lat}`);
        console.log(`Longitude: ${body[i].lon}`);
    }
});