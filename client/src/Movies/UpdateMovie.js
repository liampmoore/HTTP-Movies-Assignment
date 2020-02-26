import React from 'react'


const UpdateMovie = (props) => {
    return (
        <form>
            <input name='title' placeholder='title'></input>
            <input name='director' placeholder='director'></input>
            <input name='metascore' placeholder='metascore' type='number'></input>
            <form>
                <input name='star'></input>
            </form>
            <input type='submit'/>
        </form>
    )
}