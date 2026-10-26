const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    theatre: { type: mongoose.Schema.Types.ObjectId, ref: 'Theatre', required: true },
    timings: [{ type: String, required: true }], // e.g., ["10:00 AM", "03:30 PM", "09:00 PM"]
    price: { type: Number, required: true },
    date: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Show', showSchema);