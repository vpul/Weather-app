require("dotenv").config({ 
    path: 'variables.env' 
});

const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        results.forEach(result => {
            weather.getWeather(result.latitude, result.longitude, (errorMessage, weatherResults) => {
                if (errorMessage) {
                    console.log(errorMessage);
                } else {
                    console.log("--");
                    console.log(result.address);
                    console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}.`);
                }
            });
        });
    }
});


