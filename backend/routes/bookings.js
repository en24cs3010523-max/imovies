const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// POST: Create a new movie ticket booking
router.post('/', async (req, res) => {
    try {
        const { user, movie, seats, totalAmount, showtime } = req.body;

        const newBooking = new Booking({
            user,
            movie,
            seats,
            totalAmount,
            showtime
        });

        const savedBooking = await newBooking.save();
        res.status(201).json({ message: 'Ticket booked successfully!', booking: savedBooking });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET: Fetch all bookings for a specific user
router.get('/user/:userId', async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.params.userId }).populate('movie');
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;