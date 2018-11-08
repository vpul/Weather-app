const yargs = require('yargs');
const geocode = require('./geocode/geocode');

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
        console.log(JSON.stringify(results, undefined, 2));
    }
});

