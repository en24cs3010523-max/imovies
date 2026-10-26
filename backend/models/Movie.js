const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    language: { type: String, required: true },
    description: { type: String },
    duration: { type: Number }, // in minutes
    posterUrl: { type: String },
    releaseDate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);