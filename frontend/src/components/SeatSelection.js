import React, { useState } from 'react';

function SeatSelection({ movie, show, user, onBack, onBookingSuccess }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Define a simple 4x5 seat grid (Rows A to D, Numbers 1 to 5)
  const rows = ['A', 'B', 'C', 'D'];
  const seatNumbers = [1, 2, 3, 4, 5];

  const toggleSeat = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleBooking = async () => {
    if (!user) {
      alert('Please log in to complete your booking.');
      return;
    }

    if (selectedSeats.length === 0) {
      setError('Please select at least one seat.');
      return;
    }

    setLoading(true);
    setError('');

    const bookingData = {
      user: user._id || user.id, // Handle user ID format
      movie: movie._id,
      seats: selectedSeats,
      totalAmount: selectedSeats.length * show.price,
      showtime: show.time || show.timings?.[0] // Fallback depending on data structure
    };

    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to complete booking');
      }

      alert('Ticket booked successfully!');
      if (onBookingSuccess) onBookingSuccess(data.booking);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
      <button 
        onClick={onBack} 
        style={{ marginBottom: '15px', padding: '6px 10px', cursor: 'pointer', background: '#ccc', border: 'none', borderRadius: '4px' }}
      >
        ← Back to Showtimes
      </button>

      <h2>Select Your Seats</h2>
      <p><strong>Movie:</strong> {movie.title}</p>
      <p><strong>Theatre:</strong> {show.theatre?.name}</p>
      <p><strong>Price per Ticket:</strong> ₹{show.price}</p>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Screen Indicator */}
      <div style={{ background: '#333', color: '#fff', textAlign: 'center', padding: '8px', margin: '20px 0', borderRadius: '4px', letterSpacing: '2px', fontWeight: 'bold' }}>
        SCREEN THIS WAY
      </div>

      {/* Seat Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', margin: '20px 0' }}>
        {rows.map((row) => (
          <div key={row} style={{ display: 'flex', gap: '10px' }}>
            {seatNumbers.map((num) => {
              const seatId = `${row}${num}`;
              const isSelected = selectedSeats.includes(seatId);
              return (
                <button
                  key={seatId}
                  onClick={() => toggleSeat(seatId)}
                  style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: isSelected ? '#28a745' : '#e0e0e0',
                    color: isSelected ? '#fff' : '#333',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  {seatId}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Booking Summary */}
      <div style={{ borderTop: '1px solid #ddd', paddingTop: '15px', marginTop: '20px' }}>
        <p><strong>Selected Seats:</strong> {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}</p>
        <p><strong>Total Amount:</strong> ₹{selectedSeats.length * show.price}</p>

        <button
          onClick={handleBooking}
          disabled={loading || selectedSeats.length === 0}
          style={{
            backgroundColor: selectedSeats.length > 0 ? '#e50914' : '#ccc',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '4px',
            cursor: selectedSeats.length > 0 ? 'pointer' : 'not-allowed',
            fontWeight: 'bold',
            width: '100%',
            marginTop: '10px'
          }}
        >
          {loading ? 'Processing...' : 'Confirm & Book Tickets'}
        </button>
      </div>
    </div>
  );
}

export default SeatSelection;

