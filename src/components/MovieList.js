import React, { useEffect,useRef } from 'react'

function MovieList(props) {
  const { movies ,handleFavouritesClick} = props;
  const FavouriteComponent=props.favouriteComponent;

  return (
    <>
      {movies.map((movie) => (
        <div  className='image-container div-sizing d-flex justify-content-start p-2'>
          <img src={movie.Poster} />
          <div onClick={()=>handleFavouritesClick(movie)} className='overlay d-flex align-items-center justify-content-center'>
            <FavouriteComponent/>
          </div>
        </div>)
      )}

    </>
  )
}

export default MovieList