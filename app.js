const express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    bluebird = require('bluebird');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text({
    type: "text/plain"
}));

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

//Models
Auth = require('./models/authSchema.js');
Location = require('./models/locationSchema.js');

//routes
require('./routes/auth.js');
require('./routes/location.js');

app.listen(3000, () => {
    console.log("Node server is listening at port 3000");
});