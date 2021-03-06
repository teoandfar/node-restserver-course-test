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

// app.use(require('./routes/user').default);
// app.use(require('./routes/user'));
// app.use(require('./routes/login'));
app.use(require('./routes/index'));


console.log('server1.1');
mongoose.connect(process.env.URL_DB, { useNewUrlParser: true }, (err, res) => {
    if (err) throw err;
    console.log('Database online');

})
app.listen(process.env.PORT, () => {
    console.log('Listening port', process.env.PORT)
});