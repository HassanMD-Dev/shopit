import React, { useState } from 'react'

const Search = ({ history }) => {
    const [keyword, setKeyword] = useState('');

    const searchHandler = (e) => {
        e.preventDefault();

        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push(`/`);
        }
    }
  return (
    <form onSubmit={searchHandler}>
        <div className="input-group">
            <input
              type="text"
              id="search_field"
              aria-describedby="search_btn"
              className="form-control"
              placeholder="Enter Product Name ..."
              name="keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button id="search_btn" className="btn" type="submit">
              <i className="fa-solid fa-magnifying-glass" aria-hidden="false"></i>
            </button>
          </div>
    </form>
    
  )
}

export default Search;