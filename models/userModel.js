const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        //required: true,
    },
    lastName: {
        type: String,
        //required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        
    },
    FailedLoginAttempts: {
        type: Number,
        default: 0
    },
    sessions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session'
    }],
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

const Users = mongoose.model('User', userSchema);

module.exports = Users;