require("dotenv").config({ 
    path: 'variables.env' 
});

// const yargs = require('yargs');
// const geocode = require('./geocode/geocode');

// var argv = yargs
//     .options({
//         a: {
//             describe: "Address to fetch Weather for",
//             demand: true,
//             alias: 'address',
//             string: true
//         }
//     })
//     .help()
//     .alias('help', 'h')
//     .argv;

// geocode.geocodeAddress(argv.address, (errorMessage, results) => {
//     if (errorMessage) {
//         console.log(errorMessage);
//     } else {
//         console.log(JSON.stringify(results, undefined, 2));
//     }
// });


const request = require('request');
request({
    url: `https://api.darksky.net/forecast/${process.env.API_KEY}/37.8267,-122.4233`,
    json: true
}, (error, response, body) => {
    if (!error && response.statusCode === 200) {
        console.log(body.currently.temperature);
    } else {
        console.log("Unable to fetch Weather");
    }
});