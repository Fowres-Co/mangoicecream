const mongoose = require('mongoose');

const lboardSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    studentName: String,
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    scoreHoy: Number,
    scoreMonth: Number,
    scoreTotal: Number,
    rank: Number
});

module.exports = mongoose.model('Lboard', lboardSchema);