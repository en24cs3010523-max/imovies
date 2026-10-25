const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Sample Movies Data
const movies = [
  { id: 1, title: "Inception", year: 2010, rating: "8.8" },
  { id: 2, title: "Interstellar", year: 2014, rating: "8.7" },
  { id: 3, title: "The Dark Knight", year: 2008, rating: "9.0" },
  { id: 4, title: "Avengers: Endgame", year: 2019, rating: "8.4" }
];

app.get('/', (req, res) => {
  res.send('IMovies Backend is Running!');
});

// Real API - Movies list
app.get('/api/movies', (req, res) => {
  res.json(movies);
});

// Single movie API
app.get('/api/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id == req.params.id);
  if(movie) res.json(movie);
  else res.status(404).json({ message: "Movie not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});