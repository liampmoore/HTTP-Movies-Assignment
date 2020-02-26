import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, useHistory } from 'react-router-dom';


function DeleteMovie(props) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const history = useHistory()

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);


  const handleDelete = async () => {
    await props.deleteMovie(movie.id)
    history.push("/")
  }

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className='save-wrapper' style={{display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
         <div className="movie-card" style={{height: '200px', width: '95%'}}>
             <h3>Delete Movie</h3>
  <p>Are you sure you want to delete {movie.title}?<br/>You can't undo this action.</p>
        <div className='delete-button' onClick={() => handleDelete()}>Yes</div>
        <div className='save-button' onClick={() => history.push(`/movies/${movie.id}`)}>No</div>
        
    </div>
    </div>
  );
}

export default DeleteMovie;
