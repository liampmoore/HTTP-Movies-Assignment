import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import {useHistory} from 'react-router-dom';

function MovieList({ movies, getMovieList }) {
  const history = useHistory()
 useEffect(() => {
  getMovieList()
 }, [getMovieList])

  return (
    <div className="movie-list">

      <div className='movie-card' style={{color: 'blue'}} onClick={() => history.push("/add-movie")}>
        <p>Click here to add a new movie to the database...</p>
      </div>

      {
        movies.map(movie => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        ))
      }
    </div>
  );
}

export default MovieList;
