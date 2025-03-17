const mongoose = require('mongoose');

const photographerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    website: {
        type: String,
        default: 'none'
    },
    bio: {
        type: String,
        default: 'none'
    },
    sessions: [{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'Session' 
    }],
    logo: {
        type: String,
        default: 'none'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},{
    versionKey: false
});

const Photographer = mongoose.model('Photographer', photographerSchema);

module.exports = Photographer;