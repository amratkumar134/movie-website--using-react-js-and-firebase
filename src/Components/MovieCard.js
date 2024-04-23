// MovieCard.js
import React from 'react';
import './MovieCard.css';

const MovieCard = ({ info }) => {
 
  const { title, overview, poster_path, release_date, vote_average } = info;

  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
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
      </div>
    </div>
  );
};

export default MovieCard;
