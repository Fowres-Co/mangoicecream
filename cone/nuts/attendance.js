const mongoose = require('mongoose');

const attSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    postDate: { type: Date, default: Date.now },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    breakfast: { type: Number, enum: [-1, 0, 1], default: 0 },
    lunch: { type: Number, enum: [-1, 0, 1], default: 0 },
    snacks: { type: Number, enum: [-1, 0, 1], default: 0 },
    dinner: { type: Number, enum: [-1, 0, 1], default: 0 }
});

//-1 not attending
//0 not answered
//1 attending

module.exports = mongoose.model('Attendance', attSchema);
