const request = require('request');

request({ 
    url: 'https://nominatim.openstreetmap.org/search.php?q=1301+lombard+street+philadelphia&format=json',
    json: true,
    headers: {
        'User-Agent': 'request'
    }
}, (error, response, body) => {
    console.log(body);
});