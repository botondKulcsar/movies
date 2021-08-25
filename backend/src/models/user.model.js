const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    yearOfBirth: {
        type: Number,
        required: true
    },
    avatarURL: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    friends: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ],
    markedAsFriends: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ],
    movieCategories: [ String ],
    favMovies: [
        {
            _id: String
        }
    ],
    favActors: [
        {
            _id: String
        }
    ]
});

module.exports = mongoose.model('User', UserSchema);