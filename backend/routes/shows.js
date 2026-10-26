const express = require('express');
const router = express.Router();
const Show = require('../models/Show');
require('../models/Theatre'); // Ensures Theatre schema is registered for .populate()

// Get all showtimes for a specific movie
router.get('/movie/:movieId', async (req, res) => {
  try {
    const shows = await Show.find({ movie: req.params.movieId }).populate('theatre');
    res.json(shows);
  } catch (err) {
    console.error('Error fetching shows:', err);
    res.status(500).json({ error: 'Server error fetching showtimes' });
  }
});

// Create a new showtime
router.post('/', async (req, res) => {
  try {
    const newShow = new Show(req.body);
    const savedShow = await newShow.save();
    res.status(201).json(savedShow);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

