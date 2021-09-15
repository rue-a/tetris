const express = require('express');

const app = express();
app.listen(3000, () => console.log('listening at port 3000'));

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
