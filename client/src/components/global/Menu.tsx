import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
  return (
    <ul className="navbar-nav ms-auto">
      {Object.entries({ "Регистрация": '/register', "Войти": '/login' }).map((item, idx) => (
        <li className="nav-item" key={idx + item[0]}>
          <Link className="nav-link active" aria-current="page" to={item[1]}>{item[0]}</Link>
        </li>
      ))}
      <li className="nav-item dropdown">
        <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Имя пользователя
              </span>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li><Link className="dropdown-item" to="/profile">Профиль</Link></li>
          <li><hr className="dropdown-divider" /></li>
          <li><Link className="dropdown-item" to="/">Выйти</Link></li>
        </ul>
      </li>
    </ul>
  )
}

export default Menu
