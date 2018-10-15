require('./config/config');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/', function(req, res) {
    // res.send('Hello World');
    res.json('Hello World');
});

app.get('/user', function(req, res) {
    res.json('get User');
});
app.post('/user', function(req, res) {
    let body = req.body;
    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            message: 'name is necessary'
        });
    } else {

        // res.json('post User');
        res.json({ body });
    }
});
app.put('/user/:id', function(req, res) {

    let id = req.params.id;
    res.json({ id });
});
app.delete('/user', function(req, res) {
    res.json('delete User');
});

// app.listen(3000, () => {
//     console.log('Listening port', 3000)
// });

console.log("server1");

app.listen(process.env.PORT, () => {
    console.log('Listening port', process.env.PORT)
});