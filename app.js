const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    bluebird = require('bluebird');

const app = express();

Promise = bluebird;
// Promise.config({
//     warnings: false
// });

mongoose.Promise = require('bluebird');
if (process.env.NODE_ENV === 'development') {
    app.set('db', 'mongodb://localhost:27017/vokal');
} else if (process.env.NODE_ENV === 'production') {
    app.set('db', 'mongodb://localhost:27017/vokal'); // Production mode
}else{
    console.warn("You don't have a development environment setup");
    app.set('db', 'mongodb://localhost:27017/vokal');   
}

require('./initialize.js')(app);
let checkauth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        console.log("Doesn't authenticate");
        res.status(401);
        res.set('Content-Type', 'application/json');
        res.end(JSON.stringify({
            'success': false
        }));
    }
};


mongoose.connect(app.get('db'));
console.log('db connected');

app.all('*', function(req, res, next) {
    //let allowedOrigins = ['http://localhost:8080', 'http://127.0.0.1:8080'];
    let origin = req.headers.origin;
    // if (allowedOrigins.indexOf(origin) > -1) {
    //     res.setHeader('Access-Control-Allow-Origin', origin);
    // }
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.get('/', (req, res) => {
    res.send("Hello World");
    res.end();
});
//Models
User = require('./models/userSchema.js');
Location = require('./models/locationSchema.js');

//routes
require('./routes/auth.js')(app, checkauth);
require('./routes/location.js')(app, checkauth);

app.listen(3000, () => {
    console.log("Node server is listening at port 3000");
});
