const express = require('express');
const fs = require('fs');

const app = express();
app.listen(3000, () => console.log('listening at port 3000'));


// read and write files in node tutorial:
// https://stackabuse.com/reading-and-writing-json-files-with-node-js/
function readJSON(path) {
    let data = fs.readFileSync(path);
    let highscore = JSON.parse(data);
    return highscore;
}

function writeJSON(path, json_string) {
    fs.writeFileSync(path, json_string);
}

// highscore = readJSON('private/highscore.json')
// highscore['microsoft sam'] = 999;
// highscore['jutta'] = 54
// writeJSON('private/highscore.json', JSON.stringify(highscore))




app.use(express.static('public'));

// accept text from post
// https://expressjs.com/en/4x/api.html#express.text
app.use(express.text())


// POST method route
app.post('/api/post', (request, response) => {
    console.log('POST request received')
    console.log(request.body);
    response.json({
        status: 'success',
        msg: 'POST request response.'
    })
});
