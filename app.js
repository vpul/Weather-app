require("dotenv").config({
    path: 'variables.env'
});

const fs = require('fs');
const yargs = require('yargs');
const axios = require('axios');

let argv = yargs
    .options({
        a: {
            describe: "Address to fetch Weather for",
            demand: false,
            alias: 'address',
            string: true
        },
        d: {
            describe: "Set default address",
            demand: false,
            alias: 'setdefault',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

if (argv.setdefault) {
    fs.writeFileSync("defaultAddress.txt", argv.setdefault);
}

if (!argv.address) {
    try {
      argv.address = fs.readFileSync("defaultAddress.txt");
    } catch (e) {
        console.log("Please provide an address. \n");
        yargs.showHelp();
        process.exit();
    }
}

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
        console.log(`It's currently ${response.data.currently.summary}. The current temperature is ${response.data.currently.temperature}. It feels like ${response.data.currently.apparentTemperature}.`);
    }) 
    .catch((e) => {
        if (e.code === 'ENOTFOUND') {
            console.log("Unable to connect to API server");
        } else {
            console.log(e.message);
        }
    });