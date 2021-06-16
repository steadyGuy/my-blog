import React, { useState } from 'react'

const Search = () => {
  const [search, setSearch] = useState('')
  return (
    <form className="search w-100 me-3">
      <input
        className="form-control w-100"
        type="search"
        placeholder="Введите текст для поиска..."
        value={search} aria-label="Search"
        onChange={e => setSearch(e.target.value)}
      />
    </form>
  )
}

export default Search
