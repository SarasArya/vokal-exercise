locationCntrl = require('../controller/locationController.js');
module.exports = (app, checkauth) => {
    app.get('/location/results', checkauth, (req, res) => {
        locationCntrl.fetch(req, res);
    });

    app.post('/location/results', checkauth, (req, res) => {
        locationCntrl.save(req, res);
    });
};
