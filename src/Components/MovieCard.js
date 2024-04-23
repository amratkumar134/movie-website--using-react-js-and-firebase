import React, { useState } from 'react';
import './MovieCard.css';

const MovieCard = ({ info }) => {
  const { title, overview, poster_path, release_date, vote_average, id } = info;
  const [trailerKey, setTrailerKey] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const fetchTrailer = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=514c4eb76541f582e99225349b5dcb2c`);
      const data = await response.json();
      const trailer = data.results.find((result) => result.type === 'Trailer');
      if (trailer) {
        setTrailerKey(trailer.key);
      } else {
        console.error('No trailer found for this movie.');
      }
    } catch (error) {
      console.error('Error fetching trailer:', error);
    }
  };

  return (
    <div className="card">
      {poster_path ? (
        <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} className="card-img-top" alt={title} />
      ) : (
        <div className="no-image">No Image Available</div>
      )}
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{overview}</p>
        <p className="card-text">Release Date: {formatDate(release_date)}</p>
        <p className="card-text">Rating: {vote_average}</p>
        
        {trailerKey ? (
          <iframe
            title={`${title} Trailer`}
            width="250"
            height="400"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <button className="watch-trailer-button" onClick={fetchTrailer}>
            Watch Trailer
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
