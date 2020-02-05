const mongoose = require('mongoose');

const mealSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    mealItems: [String],
    mealTime: { type: String, enum: ['lunch', 'breakfast', 'snacks', 'dinner'], required: true },
    messId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mess'}
});

module.exports = mongoose.model('Meal', mealSchema);