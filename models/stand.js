const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create geolocation schema
const GeoSchema = new Schema({
    type: {
        type:String,
        default: "Point"
    },
    coordinates: {
        type:[Number],
        index: "2dsphere"
    }
});

// create schema & model
const schema = new Schema({
    name: {
        type: String,
        required:[true, 'Name field is required']
    },
    rank: {
        type: String
    },
    available: {
        type:Boolean,
        default: false
    },
    geometry: GeoSchema
    // add in geo location

});

const Stand = mongoose.model('stand', schema);

module.exports = Stand