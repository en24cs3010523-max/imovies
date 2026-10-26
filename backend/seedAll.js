require('dotenv').config();
const mongoose = require('mongoose');
const Movie = require('./models/Movie');
const Theatre = require('./models/Theatre');
const Show = require('./models/Show');

const seedAll = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected for full seeding...');

        // Clear existing data from all collections
        await Movie.deleteMany({});
        await Theatre.deleteMany({});
        await Show.deleteMany({});

        // 1. Insert Movies
        const movies = await Movie.insertMany([
            {
                title: 'Pushpa 2: The Rule',
                genre: 'Action',
                language: 'Telugu',
                description: 'Pushpa and Bhanwar Singh continue their fierce rivalry in this action-packed sequel.'
            },
            {
                title: 'Interstellar',
                genre: 'Sci-Fi',
                language: 'English',
                description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.'
            },
            {
                title: 'Inception',
                genre: 'Thriller',
                language: 'English',
                description: 'A thief who steals corporate secrets through the use of dream-sharing technology.'
            }
        ]);
        console.log('Movies seeded successfully!');

        // 2. Insert Theatres
        const theatres = await Theatre.insertMany([
            { name: 'PVR Cinemas', location: 'City Center Mall', totalScreens: 4 },
            { name: 'Cinepolis', location: 'MG Road', totalScreens: 3 },
            { name: 'IMAX Multiplex', location: 'Downtown', totalScreens: 5 }
        ]);
        console.log('Theatres seeded successfully!');

        // 3. Insert Shows linked to the newly generated Movie & Theatre IDs
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
        console.log('Shows seeded successfully with matching references!');
        process.exit();
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
};

seedAll();

