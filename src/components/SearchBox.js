import React from 'react'

function SearchBox(props) {
    const {searchValue,setSearchValue}=props;

  return (
    <div className='col col-sm-4'>
        <input className='form-control' value={searchValue}
        onChange={(e)=>setSearchValue(e.target.value)} placeholder="Type to search..."></input>
    </div>
  )
}

export default SearchBox;