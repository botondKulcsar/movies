const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    rank: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    fullTitle: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    crew: {
        type: String,
        required: true
    },
    imDbRating: {
        type: String,
        required: true
    },
    imDbRatingCount: {
        type: String,
        required: true
    }
})



module.exports = mongoose.model('Movie', MovieSchema);