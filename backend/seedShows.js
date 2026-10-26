require('dotenv').config();
const mongoose = require('mongoose');
const Movie = require('./models/Movie');
const Theatre = require('./models/Theatre');
const Show = require('./models/Show');

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected for show seeding...');

        // Clear existing theatres and shows
        await Theatre.deleteMany({});
        await Show.deleteMany({});

        // Create sample theatres
        const theatres = await Theatre.insertMany([
            { name: 'PVR Cinemas', location: 'City Center Mall', totalScreens: 4 },
            { name: 'Cinepolis', location: 'MG Road', totalScreens: 3 },
            { name: 'IMAX Multiplex', location: 'Downtown', totalScreens: 5 }
        ]);

        // Fetch existing movies from database
        const movies = await Movie.find({});
        if (movies.length === 0) {
            console.log('No movies found! Please run node seed.js first.');
            process.exit(1);
        }

        // Create shows for each movie
        const shows = [];
        for (let movie of movies) {
            for (let theatre of theatres) {
                shows.push({
                    movie: movie._id,
                    theatre: theatre._id,
                    timings: ['10:00 AM', '01:30 PM', '05:00 PM', '08:30 PM'],
                    price: 250,
                    date: new Date()
                });
            }
        }

        await Show.insertMany(shows);
        console.log('Sample theatres and shows inserted successfully!');
        process.exit();
    } catch (err) {
        console.error('Error seeding shows:', err);
        process.exit(1);
    }
};

seedDatabase();

