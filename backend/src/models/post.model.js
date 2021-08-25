const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    movieId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema)