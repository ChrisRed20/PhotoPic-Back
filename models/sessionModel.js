const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    photographer: {
        type: Schema.Types.ObjectId,
        ref: 'Photographer',
        required: true
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    albumName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        default: 'none'
    },
    accesCode: {
        type: String,
        required: true,
        unique: true
    },
    photos: [{
        type: Schema.Types.ObjectId,
        ref: 'Photo'
    }],
    revised: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Session', sessionSchema);