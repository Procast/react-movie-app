

import { useEffect, useState,useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';
import AddFavourite from './components/AddFavourite';
import MovieList from "./components/MovieList"

import MovieListHeading from './components/MovieListHeading';
import axios from 'axios';
import SearchBox from './components/SearchBox';
import RemoveFavourite from './components/RemoveFavourite';

function App() {

  const [movies, setMovies] = useState([]);
  const [favourites,setFavourites]=useState([]);
  const [searchValue,setSearchValue]=useState('');

 useEffect(()=>{
   axios.get(`https://www.omdbapi.com/?s=${searchValue}&apikey=79928831`)
   .then((res)=>{
     if (res.data.Search){
      setMovies(res.data.Search);
     }
    
   })
 },[searchValue]);

 useEffect(()=>{
   const movieFavourites=JSON.parse(localStorage.getItem("react-movie-app-favourites"));

    if (movieFavourites){
      setFavourites(movieFavourites);
    }
   
 },[])

 const saveToLocalStorage=(items)=>{
   localStorage.setItem("react-movie-app-favourites",JSON.stringify(items));

 }



 const addFavouriteMovie=(movie)=>{
   const newFavouriteList=[...favourites,movie];
   setFavourites(newFavouriteList);

   saveToLocalStorage(newFavouriteList);
 }

 const removeFavouriteMovie=(movie)=>{
   const newFavouriteList=favourites.filter((item)=>movie.imdbID!==item.imdbID);

   setFavourites(newFavouriteList);
   saveToLocalStorage(newFavouriteList);
 }


 const horiScroll = useRef()
console.log(horiScroll)
  useEffect(()=>{
    console.log('reb')
    horiScroll.current.addEventListener("wheel", (evt) => {
        evt.preventDefault();
        horiScroll.current.scrollLeft += evt.deltaY;
    });
  },[])

  return (
    <div className="background container-fluid movie-app">

      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading
        heading="Movies"
        />
        <SearchBox
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        />
      </div>
      
      <div ref={horiScroll} className='row hori-scroll'>
        <MovieList
          movies={movies}
          handleFavouritesClick={addFavouriteMovie}
          favouriteComponent={AddFavourite}
        />
      </div>

      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading
        heading="Favourites"
        />
        
      </div>

      <div className='row'>
        <MovieList
          movies={favourites}
          handleFavouritesClick={removeFavouriteMovie}
          favouriteComponent={RemoveFavourite}
        />
      </div>

    </div>
  );
}

export default App;
