const request = require('request');

request({ 
    url: 'https://nominatim.openstreetmap.org/search.php?q=1301+lombard+street+philadelphia&format=json',
    json: true,
    headers: {
        'User-Agent': 'request'
    }
}, (error, response, body) => {
    console.log(JSON.stringify(body, undefined, 2)); //show full JSON Object, with 2 indentations
});