const mongoose = require('mongoose');
const Movie = require('./models/Movie');
require('dotenv').config();

const sampleMovies = [
    {
        title: "Pushpa 2: The Rule",
        genre: "Action",
        language: "Telugu",
        description: "Pushpa and Bhanwar Singh continue their fierce rivalry in this action-packed sequel.",
        duration: 200,
        releaseDate: new Date("2024-12-05")
    },
    {
        title: "Stree 2",
        genre: "Horror",
        language: "Hindi",
        description: "The town of Chanderi is visited by a new mysterious threat, and the gang is back to save it.",
        duration: 147,
        releaseDate: new Date("2024-08-15")
    },
    {
        title: "Kalki 2898 AD",
        genre: "Sci-Fi",
        language: "Telugu",
        description: "A modern-day avatar of Hindu god Vishnu descends to earth to protect the world from evil forces.",
        duration: 181,
        releaseDate: new Date("2024-06-27")
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/imovies');
        console.log('Database connected for seeding...');

        await Movie.deleteMany({});
        console.log('Old movies cleared.');

        await Movie.insertMany(sampleMovies);
        console.log('Sample movies inserted successfully!');

        mongoose.connection.close();
        console.log('Database connection closed.');
    } catch (err) {
        console.error('Seeding error:', err);
        mongoose.connection.close();
    }
};

seedDB();