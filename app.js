const request = require('request');

request({ 
    url: 'https://nominatim.openstreetmap.org/search.php?q=1301+lombard+street+philadelphia&format=json',
    json: true,
    headers: {
        'User-Agent': 'request'
    }
}, (error, response, body) => {
    console.log(`Address: ${body[0].display_name}`);
    console.log(`Latitude: ${body[0].lat}`);
    console.log(`Longitude: ${body[0].lon}`);
});