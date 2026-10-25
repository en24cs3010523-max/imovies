import { useState, useEffect } from 'react';

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const posters = {
    "Inception": "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    "Interstellar": "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    "The Dark Knight": "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    "Avengers: Endgame": "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg"
  };

  useEffect(() => {
    fetch('http://localhost:5000/api/movies')
      .then(res => res.json())
      .then(data => setMovies(data));
  }, []);

  const filtered = movies.filter(m => m.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ background: '#0f0f0f', color: 'white', minHeight: '100vh', padding: '20px', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#e50914', textAlign: 'center', fontSize: '50px', margin: '10px' }}>IMovies</h1>
      
      <input 
        placeholder="Search movie..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ display: 'block', margin: '20px auto', padding: '12px', width: '300px', borderRadius: '20px', border: 'none' }}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', padding: '20px' }}>
        {filtered.map(movie => (
          <div key={movie._id} onClick={() => setSelected(movie)} style={{ background: '#1f1f1f', borderRadius: '15px', overflow: 'hidden', cursor: 'pointer', border: '1px solid #333' }}>
            <img src={posters[movie.title] || movie.poster} alt={movie.title} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
            <div style={{ padding: '12px' }}>
              <h3 style={{ margin: '5px 0' }}>{movie.title}</h3>
              <p style={{ color: '#aaa', fontSize: '13px' }}>{movie.year} • {movie.genre}</p>
              <p style={{ color: 'gold' }}>⭐ {movie.rating}</p>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div onClick={() => setSelected(null)} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#222', padding: '30px', borderRadius: '20px', maxWidth: '500px', width: '90%', position: 'relative' }}>
            <button onClick={() => setSelected(null)} style={{ position: 'absolute', top: '10px', right: '15px', background: 'transparent', color: 'white', border: 'none', fontSize: '24px', cursor: 'pointer' }}>X</button>
            <img src={posters[selected.title]} alt={selected.title} style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: '15px' }} />
            <h2 style={{ marginTop: '15px' }}>{selected.title}</h2>
            <p style={{ color: '#aaa' }}>{selected.year} | {selected.genre} | ⭐ {selected.rating}</p>
            <p style={{ marginTop: '15px', lineHeight: '1.6', color: '#ccc' }}>{selected.description || "A mind-bending thriller about dreams, space, and superheroes. This is one of the best movies ever made!"}</p>
            <button onClick={() => window.open(`https://www.youtube.com/results?search_query=${selected.title} trailer`)} style={{ marginTop: '20px', background: '#e50914', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', width: '100%' }}>▶ Watch Trailer</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;