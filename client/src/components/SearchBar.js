import React, { useState } from "react"
import { Link } from "react-router-dom"

const SearchBar = () => {
  const [search, setSearch] = useState("")

  return (
    <div className="search-bar__container">
      <form className="search-bar">
        <input
          type="text"
          className="search-bar__input"
          placeholder="Search"
          aria-label="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <Link
          to={{
            pathname: `/Search/${search}`
          }}
        >
          <button type="submit">     
              <i
                className="search-bar__submit fas fa-search"
                aria-label="submit search"
              ></i>
          </button>
        </Link>
      </form>
    </div>
  )
}

export default SearchBar
