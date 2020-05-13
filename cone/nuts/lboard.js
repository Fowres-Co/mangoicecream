const mongoose = require('mongoose');

const lboardSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    streak: { type: Number, default: 0 },
    scoreDaily: { type: Number, default: 0 },
    scoreTotal: { type: Number, default: 0 }
});

module.exports = mongoose.model('Lboard', lboardSchema);