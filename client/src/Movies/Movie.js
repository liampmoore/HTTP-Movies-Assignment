import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, useHistory } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const history = useHistory()

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />


      <div style={{display: 'flex', flexDirection: 'column'}}>
      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      
      <div className='edit-button' onClick={() => history.push(`/update-movie/${movie.id}`)}>
        Edit
      </div>

      <div className='delete-button' onClick={() => history.push(`/delete-movie/${movie.id}`)}>
        Delete
      </div>
      </div>
    </div>
  );
}

export default Movie;
