require('./config/config');
const express = require('express');
const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
const app = express();

const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(require('./routes/user'));

// console.log(app);

// mongoose.connect('mongodb://localhost:27017/coffee',  (err, res) => {
// mongoose.connect('mongodb://localhost:27017/coffee', { useNewUrlParser: true }, (err, res) => {
mongoose.connect(process.env.URL_DB, { useNewUrlParser: true }, (err, res) => {
    if (err) throw err;
    console.log('Database online');

})
app.listen(process.env.PORT, () => {
    console.log('Listening port', process.env.PORT)
});