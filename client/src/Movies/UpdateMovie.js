import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouteMatch, useHistory } from 'react-router-dom'
import MovieCard from './MovieCard'


const UpdateMovie = (props) => {
    const [movie, setMovie] = useState(null);
    const [star, setStar] = useState('')
    const history = useHistory()
    const match = useRouteMatch();


    const fetchMovie = id => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => setMovie(res.data))
            .catch(err => console.log(err.response));
    };


    useEffect(() => {
        fetchMovie(match.params.id);
    }, [match.params.id]);

    const handleChange = (e) => {
        e.preventDefault()
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    const handleNewStar = (e) => {
        e.preventDefault()
        setMovie({
            ...movie,
            stars: [...movie.stars, star]
        })

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.editMovie(movie)
        history.push(`/movies/${movie.id}`)

    }

    if (!movie) {
        return <div>Loading movie information...</div>;
    }




    return (
        <div className='save-wrapper'>
            <MovieCard movie={movie} />
            <div className="movie-card">
                <h2>Edit Movie</h2>
                <div style={{ display: 'flex', flexDirection: 'row' }}>

                    <form noValidate onSubmit={(e) => handleSubmit(e)}>
                        <input name='title' placeholder='title' value={movie.title} onChange={(e) => handleChange(e)}></input>
                        <br></br>
                        <input name='director' placeholder='director' value={movie.director} onChange={(e) => handleChange(e)}></input>
                        <br></br>
                        <input name='metascore' placeholder='metascore' type='number' value={movie.metascore} onChange={(e) => handleChange(e)}></input>
                        <br></br>
                        <input name='star' placeholder='Add an actor' value={star} onChange={(e) => setStar(e.target.value)}></input>
                        <button onClick={(e) => handleNewStar(e)}>Add new star</button>
                        <br></br>
                        <input type='submit' />
                    </form>
                    <div>

                    </div>
                </div>

                <div className='edit-button' onClick={() => history.push(`/movies/${movie.id}`)}>
        Cancel Edit
      </div>
            </div>
        </div>
    )
}


export default UpdateMovie;