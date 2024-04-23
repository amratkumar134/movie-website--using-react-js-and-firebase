import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Slider.css'; 
function Slider() {
    const [movies, setMovies] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        
        axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=514c4eb76541f582e99225349b5dcb2c')
            .then(response => {
                setMovies(response.data.results);
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            });
    }, []);

    useEffect(() => {
        // Automatic sliding every 3 seconds
        const interval = setInterval(() => {
            setCurrentIndex(currentIndex => (currentIndex + 1) % movies.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [movies.length]);

    const handlePrev = () => {
        setCurrentIndex(currentIndex === 0 ? movies.length - 1 : currentIndex - 1);
    };

    const handleNext = () => {
        setCurrentIndex(currentIndex === movies.length - 1 ? 0 : currentIndex + 1);
    };

    return (
        <div className="slider-container">
            
            {movies.length > 0 && (
                <div className="slider">
                    {movies.map((movie, index) => (
                        <div
                            key={index}
                            className={`slider-slide ${index === currentIndex ? 'active' : ''}`}
                            style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})` }}
                        >
                         <h2 className="slider-title">Upcoming Movies</h2>
                            <div className="movie-details">
                            
                            </div>
                        </div>
                    ))}
                    <button className="slider-arrow prev" onClick={handlePrev}>&#10094;</button>
                    <button className="slider-arrow next" onClick={handleNext}>&#10095;</button>
                </div>
            )}
        </div>
    );
}

export default Slider;
