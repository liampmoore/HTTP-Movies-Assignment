import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from './Movies/UpdateMovie';
import DeleteMovie from './Movies/DeleteMovie';
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);


  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const editMovie = (movie) => {
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
        .then(res => {
          console.log(res)
          setMovieList(res.data)
        })
        .catch(err => console.log(err.response))
  }

  const deleteMovie = (id) => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
          console.log(res)

        })
        .catch(err => console.log(err))
  }

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };




  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} getMovieList={getMovieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} />
      </Route>

      <Route path='/update-movie/:id'>
        <UpdateMovie editMovie={editMovie} />
      </Route>

      <Route path='/delete-movie/:id'>
        <DeleteMovie deleteMovie={deleteMovie} getMovieList={getMovieList} />
      </Route>
    </>
  );
};

export default App;
