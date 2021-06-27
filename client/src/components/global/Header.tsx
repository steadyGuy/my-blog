import { AppBar, Button, IconButton, makeStyles, TextField, Toolbar, Typography } from '@material-ui/core';
import React from 'react'
import { Link } from 'react-router-dom';
import Menu from './DropDownMenu';
import Search from './Search';
import MenuIcon from '@material-ui/icons/Menu';
import DropDownMenu from './DropDownMenu';

const useStyles = makeStyles((theme) => ({
  navigation: {
    flexGrow: 1,
    justifyContent: "center",
  },
  search: {
    width: 0,
    opacity: 0,
  },
}));

const Header = () => {

  const classes = useStyles();

  return (
    <AppBar color="secondary" position="static">
      <Toolbar>
        <Typography variant="h6" align='left'>
          Logo
        </Typography>
        <Toolbar component="nav" variant="dense" className={classes.navigation}>
          123
        </Toolbar>
        <Search />
        <DropDownMenu />
      </Toolbar>
    </AppBar>
    // <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
    //   <div className="container-fluid">
    //     <a className="navbar-brand" href="/">Navbar</a>

    //     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    //       <span className="navbar-toggler-icon"></span>
    //     </button>
    //     <div className="collapse navbar-collapse" id="navbarSupportedContent">
    //       <Search />
    //       <Menu />
    //     </div>
    //   </div>
    // </nav>
  )
}

export default Header
