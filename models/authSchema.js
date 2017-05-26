const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const authSchema = Schema({
    emailId: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
},{
	collection : 'auth'
});

module.exports = mongoose.model('auth', authSchema);