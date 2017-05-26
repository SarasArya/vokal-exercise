const mongoose = require('mongoose'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    cookieParser = require('cookie-parser');

module.exports = app => {
    let MongoDBStore = require('connect-mongodb-session')(session);
    let sessionStore = {};
    if (process.env.NODE_ENV === 'development') {
        sessionStore = new MongoDBStore({
            uri: app.get('db'),
            collection: 'mysessions'
        });
    } else if (process.env.NODE_ENV === 'production') {
        sessionStore = new MongoDBStore({
            uri: app.get('db'),
            collection: 'mysessions'
        });
    }

    let sessionOpts = {
        saveUninitialized: true,
        resave: false,
        store: sessionStore,
        secret: "cat at my keyboard",
        cookie: {
            httpOnly: true,
            maxAge: 2419200000
        }
    };
    /*declaring all my global variables and dependencies*/
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.text({
        type: "text/plain"
    }));

    app.use(cookieParser("cat at my keyboard")); // Secret should be kept in a config file and the folder should be added in gitignore 
    app.use(session(sessionOpts));
    app.use(passport.initialize());
    app.use(passport.session());
};
