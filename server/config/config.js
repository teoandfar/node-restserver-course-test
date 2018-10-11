// =================
// PORT
// =================
process.env.PORT = process.env.PORT || 3000;

// ENVIRONMENT


// stablished by heroku
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb: //localhost:27017/coffee';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URL_DB = urlDB;