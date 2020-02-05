const mongoose = require('mongoose');

const messSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    messName: { type: String, required: true },
    strength: { type: Number, min: 0 }
});

module.exports = mongoose.model('Mess', messSchema);