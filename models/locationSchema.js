const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const coordSchema = Schema({
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});
const locationSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    searchName: {
        type: String,
        required: true
    },
    locations: {
        type: [coordSchema],
        default: []
    }
}, {
    collection: 'location'
});

module.exports = mongoose.model('location', locationSchema);
