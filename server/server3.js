require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

mongoose.set('useCreateIndex', true);
const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// enable a public directory

// console.log(__dirname + '../public');
// console.log(path.resolve(__dirname));
// app.use(express.static(__dirname + '../public'));
// console.log(path.resolve(__dirname, '../public'));
app.use(express.static(path.resolve(__dirname, '../public')));


// Global setup routes
app.use(require('./routes/index'));


console.log('server2');
mongoose.connect(process.env.URL_DB, { useNewUrlParser: true }, (err, res) => {
    if (err) throw err;
    console.log('Database online');

});
app.listen(process.env.PORT, () => {
    console.log('Listening port', process.env.PORT)
});