import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import "./Main.css";
import Slider from "./Slider";
import Footer from "./Footer";

const Main = () => {
  const [categoryData, setCategoryData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState({});

  const [url, setUrl] = useState({
    Action:
      "https://api.themoviedb.org/3/discover/movie?with_genres=28&api_key=514c4eb76541f582e99225349b5dcb2c",
    Comedy:
      "https://api.themoviedb.org/3/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc&api_key=514c4eb76541f582e99225349b5dcb2c",
    SciFi:
      "https://api.themoviedb.org/3/discover/movie?with_genres=878&api_key=514c4eb76541f582e99225349b5dcb2c",
    Thriller:
      "https://api.themoviedb.org/3/discover/movie?with_genres=53&api_key=514c4eb76541f582e99225349b5dcb2c",
    Horror:
      "https://api.themoviedb.org/3/discover/movie?with_genres=27&api_key=514c4eb76541f582e99225349b5dcb2c",
  });

  const categories = ["Action", "Comedy", "SciFi", "Thriller", "Horror"];

  useEffect(() => {
    fetchCategoryData();
  }, [currentPage]);

  const fetchCategoryData = async () => {
    const newCategoryData = {};
    const newTotalPages = {};

    for (const category of categories) {
      const response = await fetch(`${url[category]}&page=${currentPage}`);
      const data = await response.json();

      newCategoryData[category] = data.results;
      newTotalPages[category] = data.total_pages;
    }

    setCategoryData(newCategoryData);
    setTotalPages(newTotalPages);
  };

  const handleSearch = async (searchTerm) => {
    const newUrl = `https://api.themoviedb.org/3/search/movie?api_key=514c4eb76541f582e99225349b5dcb2c&query=${searchTerm}`;

    try {
      const searchResponse = await fetch(newUrl);
      const searchData = await searchResponse.json();

      const newCategoryData = {};
      const newTotalPages = {};

      for (const category of categories) {
        newCategoryData[category] = searchData.results;
        newTotalPages[category] = searchData.total_pages;
      }

      setCategoryData(newCategoryData);
      setTotalPages(newTotalPages);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const hasMorePages = Object.values(totalPages).some(
      (pages) => currentPage < pages
    );

    if (hasMorePages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <Navbar
        categories={categories}
        onCategoryClick={(category) => setCurrentPage(1)}
        onSearch={handleSearch}
      />
      <Slider />

      <div className="container">
        {categories.map((category, categoryIndex) => (
          <div key={categoryIndex} id={category}>
            <h2>{category}</h2>
            <div className="movie-card-list">
              {categoryData[category]?.length === 0 ? (
                <p className="notfound">Not Found</p>
              ) : (
                <>
                  <div className="movie-card-container">
                    {categoryData[category]?.map((movie, movieIndex) => (
                      <MovieCard key={movieIndex} info={movie} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        <span>
          Page {currentPage} of{" "}
          {Object.values(totalPages).reduce(
            (acc, val) => Math.max(acc, val),
            0
          )}
        </span>
        <button onClick={handleNextPage}>Next</button>
      </div>
      <Footer />
    </>
  );
};

export default Main;
