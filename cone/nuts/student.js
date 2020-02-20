const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    uId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    studentName: { type: String, required: true },
    messId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Mess' },
    
});

module.exports = mongoose.model('Student', studentSchema);