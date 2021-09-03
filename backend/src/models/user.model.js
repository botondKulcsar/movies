const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const UserSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    firstName: {
        type: String,
        // required: true
    },
    lastName: {
        type: String,
        // required: true
    },
    nickName: {
        type: String,
        required: true
    },
    city: {
        type: String,
        // required: true
    },
    yearOfBirth: {
        type: Number,
        // required: true
    },
    avatarURL: {
        type: String,
        default: 'https://upload.wikimedia.org/wikipedia/commons/5/59/User-avatar.svg'
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
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    markedAsFriends: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    movieCategories: [String],
    favMovies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie'
        }
    ],
    favActors: [
        {
            type: String
        }
    ]
}, { timestamps: true });

UserSchema.plugin(idValidator);

module.exports = mongoose.model('User', UserSchema);