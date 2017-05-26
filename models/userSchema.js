const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const userSchema = Schema({
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
	collection : 'user'
});

module.exports = mongoose.model('user', userSchema);