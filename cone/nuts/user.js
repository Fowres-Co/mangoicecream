const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    uPass: { type: String, required: true },
    uEmail: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    uType: { type: Number, enum: [-1, 0, 1], required: true }
});

module.exports = mongoose.model('User', userSchema);