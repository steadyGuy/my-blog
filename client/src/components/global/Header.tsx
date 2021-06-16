import React from 'react'
import { Link } from 'react-router-dom';
import Menu from './Menu';
import Search from './Search';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Navbar</a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Search />
          <Menu />
        </div>
      </div>
    </nav>
  )
}

export default Header
