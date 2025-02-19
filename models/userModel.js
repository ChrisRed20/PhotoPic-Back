const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        // required: true,
        trim: true
    },
    lastName: {
        type: String,
        // required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    FailedLoginAttempts: {
        type: Number,
        default: 0
    },
    newUser: {
        type: Boolean,
        default: true
    },
    registro: {
        type: Date,
        default: Date.now()
    }
},{
    versionKey: false
});

module.exports = mongoose.model('User', userSchema);