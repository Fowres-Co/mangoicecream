const mongoose = require('mongoose');

const statSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    messId: {type: mongoose.Schema.Types.ObjectId, ref: 'Mess'},
    postDate: { type: Date, default: Date.now},
    breakfast: { type: [Number], default: [0, 0]},
    lunch: { type: [Number], default: [0, 0]},
    snacks: { type: [Number], default: [0, 0]},
    dinner: { type: [Number], default: [0, 0]},
});

module.exports = mongoose.model('Stats', statSchema);