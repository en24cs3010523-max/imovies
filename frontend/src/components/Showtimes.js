import React, { useState, useEffect } from 'react';
import SeatSelection from './SeatSelection';

function Showtimes({ movie, onBack, user }) {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedShowWithTime, setSelectedShowWithTime] = useState(null); // Track selected show & time

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/shows/movie/${movie._id}`);
        if (!response.ok) throw new Error('Failed to fetch showtimes');
        const data = await response.json();
        setShows(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchShows();
  }, [movie._id]);

  // If a showtime is selected, render the SeatSelection view
  if (selectedShowWithTime) {
    return (
      <SeatSelection 
        movie={movie} 
        show={{ ...selectedShowWithTime.show, time: selectedShowWithTime.time }} 
        user={user} 
        onBack={() => setSelectedShowWithTime(null)} 
        onBookingSuccess={(booking) => {
          alert('Booking confirmed successfully!');
          setSelectedShowWithTime(null);
        }}
      />
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <button 
        onClick={onBack} 
        style={{ marginBottom: '20px', padding: '8px 12px', cursor: 'pointer', background: '#ccc', border: 'none', borderRadius: '4px' }}
      >
        ← Back to Movies
      </button>

      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
        <h2>{movie.title}</h2>
        <p><strong>Genre:</strong> {movie.genre} | <strong>Language:</strong> {movie.language}</p>
        <p>{movie.description}</p>
      </div>

<h3>Available Theatres & Showtimes</h3>

      {loading && <p>Loading showtimes...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && shows.length === 0 && (
        <p style={{ fontStyle: 'italic', color: '#666' }}>No showtimes available for this movie yet.</p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
        {shows.map((show) => (
          <div key={show._id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <h4>{show.theatre?.name}</h4>
            <p style={{ margin: '5px 0', color: '#555' }}>📍 Location: {show.theatre?.location}</p>
            <p style={{ margin: '5px 0', fontWeight: 'bold' }}>💰 Ticket Price: ₹{show.price}</p>
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '12px', flexWrap: 'wrap' }}>
              {show.timings.map((time, index) => (
                <button 
                  key={index} 
                  style={{ backgroundColor: '#e50914', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                  onClick={() => setSelectedShowWithTime({ show, time })}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Showtimes;

