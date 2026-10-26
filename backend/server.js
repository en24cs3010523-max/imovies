const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection (Options removed)
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/imovies')
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/movies', require('./routes/movies'));

app.get('/', (req, res) => {
    res.send('IMovies API is running...');
});

app.use('/api/auth', require('./routes/auth'));

app.use('/api/bookings', require('./routes/bookings'));

app.use('/api/shows', require('./routes/shows'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});