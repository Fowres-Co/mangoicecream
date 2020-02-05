const mongoose = require('mongoose');

const staffSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    staffRole: { type: String },
    satffName: { type: String, required: true }, 
    messId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mess' }
});

module.exports = mongoose.model('Staff', staffSchema);