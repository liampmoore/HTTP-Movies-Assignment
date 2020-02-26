import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import MovieCard from './MovieCard'


const AddMovie = (props) => {
    const [movie, setMovie] = useState({
        title: '',
        director: '',
        metascore: 50,
        stars: []
    });
    const [star, setStar] = useState('')
    const history = useHistory()

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
        setStar('')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addMovie(movie)
        history.push(`/`)

    }



    return (
        <div className='save-wrapper'>
            <MovieCard movie={movie} />
            <div className="movie-card">
                <h2>Add Movie</h2>
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

              
            </div>
        </div>
    )
}


export default AddMovie;