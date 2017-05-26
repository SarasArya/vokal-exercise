const passport = require('passport'),
    LocalStrategy = require('passport-local'),
    moment = require('moment'),
    momentTimeZone = require('moment-timezone'),
    passwordHash = require('password-hash');

module.exports = (app, checkauth) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((_id, done) => {
        User.findById(_id, (err, user) => {
            done(err, user);
        });
    });

    passport.use('local-login', new LocalStrategy({
        passReqToCallback: true
    }, (req, username, password, done) => {
        const doc = User.findOne({
            emailId: username,
        });
        doc.then(user => {
            if (user) {
                console.log("Here");
                if (passwordHash.verify(password, user.password)) {
                    console.log("password same");
                    req.session.save();
                    return done(null, user);
                } else {
                    console.log('passworddifferenece');
                    return done(null, false);
                }
            } else {
                console.log("User not found");
                return done(null, false);
            }
        });
    }));


    passport.use('local-signup', new LocalStrategy({
        passReqToCallback: true
    }, (req, username, password, done) => {
        const promise = User.findOne({
            emailId: username
        });
        promise
            .then(u => {
                if (u) {
                    console.log("Already available");
                    done(null, false);
                    req.message = "Username already exists";
                    return Promise.reject("Username already exists");
                } else {
                    Promise.resolve();
                }
            })
            .then(() => {
                const user = new User({
                    emailId: username,
                    password: passwordHash.generate(password),
                    name: req.body.name
                });
                return user.save();
            })
            .then(u => {
                if (u) {
                    done(null, u);
                    console.log(u);
                } else {
                    done(null, false);
                }
            })
            .catch(error => {
                return done(error, null, {
                    message: error
                });
            });
    }));

    app.post('/signup', passport.authenticate('local-signup'), (req, res) => {
        console.log("Auth.js  - signup");
        res.sendStatus(200);
    });

    app.post('/login', passport.authenticate('local-login'), (req, res) => {
        res.sendStatus(200);
    });

};
