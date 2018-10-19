// =================
// PORT
// =================
process.env.PORT = process.env.PORT || 3000;

// ENVIRONMENT


// stablished by heroku
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ENDING DATE
// 60 seg * 60 min * 24 h * 30 days
process.env.CADUCITY_TOKEN = 60 * 60 * 24 * 30;


// SEED TOKEN
process.env.SEED = process.env.SEED || 'this-is-the-development-seed';

console.log(process.env.SEED);


// DATABASE

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/coffee';
} else {
    urlDB = process.env.MONGO_URI;
}

console.log(urlDB);

process.env.URL_DB = urlDB;


// GOOGLE CLIENT ID
process.env.CLIENT_ID = process.env.CLIENT_ID || '397420803670-453rha1h3pffur5sq5uku92kf3i31ld4.apps.googleusercontent.com';