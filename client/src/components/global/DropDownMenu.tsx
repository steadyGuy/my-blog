import { Button, Menu, MenuItem } from '@material-ui/core';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const DropDownMenu = () => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.currentTarget)
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    // <ul className="navbar-nav ms-auto">
    //   {Object.entries({ "Регистрация": '/register', "Войти": '/login' }).map((item, idx) => (
    //     <li className="nav-item" key={idx + item[0]}>
    //       <Link className="nav-link active" aria-current="page" to={item[1]}>{item[0]}</Link>
    //     </li>
    //   ))}
    //   <li className="nav-item dropdown">
    //     <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    //       Имя пользователя
    //     </span>
    //     <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
    //       <li><Link className="dropdown-item" to="/profile">Профиль</Link></li>
    //       <li><hr className="dropdown-divider" /></li>
    //       <li><Link className="dropdown-item" to="/">Выйти</Link></li>
    //     </ul>
    //   </li>
    // </ul>
    <div>
      <Button
        variant="contained"
        color="secondary"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon />}
      >
        User
      </Button>
      <Menu
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem >Profile</MenuItem>
        <MenuItem >My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default DropDownMenu
