require("dotenv").config({
    path: 'variables.env'
});

const yargs = require('yargs');
const axios = require('axios');

let argv = yargs
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

let encodedAddress = encodeURIComponent(argv.address);
let url= `https://nominatim.openstreetmap.org/search.php?q=${encodedAddress}&format=json`;

axios.get(url)
    .then((response) => {
        if (response.data.length === 0) {
            throw new Error("Unable to find that address.");
        }
        let lat = response.data[0].lat;
        let long = response.data[0].lon;
        let weatherUrl = `https://api.darksky.net/forecast/${process.env.API_KEY}/${lat},${long}`;
        console.log(response.data[0].display_name);
        return axios.get(weatherUrl);
    })
    .then((response) => {
        console.log(`It's currently ${response.data.currently.temperature}. It feels like ${response.data.currently.apparentTemperature}.`);
    }) 
    .catch((e) => {
        if (e.code === 'ENOTFOUND') {
            console.log("Unable to connect to API server");
        } else {
            console.log(e.message);
        }
    });