const express = require('express');
const fs = require('fs');

const app = express();
const pot = process.env.PORT
app.listen(port, () => console.log('listening at port 3000'));
app.use(express.static('public'));
app.use(express.json())



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


// highscore['microsoft sam'] = 999;
// highscore['jutta'] = 54
// writeJSON('private/highscore.json', JSON.stringify(highscore))


function updateHighscore(highscore, contender) {
    // keys are automatically sorted
    for (placement of Object.keys(highscore)) {
        if (contender['score'] > Object.keys(highscore[placement])[0]) {
            let new_placement = {}
            new_placement[contender['score']] = contender['name'];
            highscore[placement] = new_placement;
            return { 'placement': placement, 'highscore': highscore };
        }
    }
    return { 'placement': null, 'highscore': highscore };
}

// GET method route
app.get('/api/get', (request, response) => {
    console.log('GET request received')
    const path = 'private/highscore.json';
    const highscore = readJSON(path);
    response.json({
        status: 'success',
        msg: highscore
    })
});

// POST method route
app.post('/api/post', (request, response) => {
    console.log('POST request received')
    const contender = request.body
    const path = 'private/highscore.json';
    const highscore = readJSON(path);
    const updates = updateHighscore(highscore, contender);
    writeJSON(path, JSON.stringify(updates['highscore']));
    response.json({
        status: 'success',
        msg: updates
    })
});
