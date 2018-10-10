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
    urlDB = 'mongodb://mlab_user:justdoit10@ds129393.mlab.com:29393/coffee';
}

process.env.URL_DB = urlDB;