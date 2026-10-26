import React, { useState, useEffect } from 'react';
import './App.css';
import Auth from './components/Auth';
import Showtimes from './components/Showtimes';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null); // Track selected movie for showtimes

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/movies');
      if (!response.ok) throw new Error('Failed to fetch movies');
      const data = await response.json();
      setMovies(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Unable to load movies. Please check your backend server.');
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className="App" style={{ padding: '20px', fontFamily: 'Arial, sans-serif', background: '#f8f9fa', minHeight: '100vh' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', padding: '0 20px' }}>
        <div>
          <h1 onClick={() => setSelectedMovie(null)} style={{ cursor: 'pointer' }}>🎬 IMovies Dashboard</h1>
          <p>Book your favorite movies seamlessly!</p>
        </div>
        <div>
          {user ? (
            <div>
              <span style={{ marginRight: '15px', fontWeight: 'bold' }}>Hello, {user.username}!</span>
              <button onClick={handleLogout} style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}>
                Logout
              </button>
            </div>
          ) : (
            <button onClick={() => { setShowAuth(!showAuth); setSelectedMovie(null); }} style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}>
              {showAuth ? 'View Movies' : 'Login / Register'}
            </button>
          )}
        </div>
      </header>

      {selectedMovie ? (
        <Showtimes movie={selectedMovie} onBack={() => setSelectedMovie(null)} user={user} />
      ) : showAuth && !user ? (
        <Auth setUser={(u) => { setUser(u); setShowAuth(false); }} />
      ) : (
        <div>
          {loading && <p style={{ textAlign: 'center' }}>Loading movies...</p>}
          {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
            {!loading && !error && movies.length === 0 && (
              <p>No movies found. Try running your seed script!</p>
            )}
            {movies.map((movie) => (
              <div 
                key={movie._id} 
                style={{ 
                  border: '1px solid #ddd', 
                  borderRadius: '8px', 
                  padding: '15px', 
                  width: '220px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                  background: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <h3>{movie.title}</h3>
                  <p><strong>Genre:</strong> {movie.genre}</p>
                  <p><strong>Language:</strong> {movie.language}</p>
                </div>
                <button 
                  style={{ 
                    backgroundColor: '#e50914', 
                    color: 'white', 
                    border: 'none', 
                    padding: '8px 12px', 
                    borderRadius: '4px', 
                    cursor: 'pointer',
                    width: '100%',
                    marginTop: '10px'
                  }}
                  onClick={() => setSelectedMovie(movie)}
                >
                  View Showtimes
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;