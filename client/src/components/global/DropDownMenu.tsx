import { Button, Menu, MenuItem, makeStyles, Theme, Avatar } from '@material-ui/core';
import React, { FC, useState } from 'react'
import { deepPurple } from '@material-ui/core/colors';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { IUser } from '../../interfaces/user';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  menu: {
    marginTop: theme.spacing(1),
  },
  menuItem: {
    borderBottom: `solid 1px ${theme.palette.grey[100]}`,
    '& > a': {
      textDecoration: 'none',
      padding: '2px 25px',
      color: theme.palette.secondary.main,
    },
    '&:last-child': {
      borderBottom: `none`,
    },
  },
  avatar: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    marginLeft: theme.spacing(1),
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
}));

type MenuProps = {
  user: IUser;
  handleLogout: any;
}

const DropDownMenu: FC<MenuProps> = ({ user, handleLogout }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        color="secondary"
        aria-controls="simple-menu"
        aria-haspopup="true"
        disableRipple
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon />}
      >
        {user.name.length > 8 ? user.name.slice(0, 8) + '...' : user.name}
        <Avatar
          alt={`${user?.name[0].toUpperCase()}${user?.name}`}
          src={user.avatar}
          className={classes.avatar}
        />
      </Button>
      <Menu
        elevation={1}
        getContentAnchorEl={null}
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
        className={classes.menu}
      >
        <MenuItem className={classes.menuItem}>
          <Link to={`/profile/${user?.id}`}>Профиль</Link>
        </MenuItem>
        <MenuItem className={classes.menuItem}>
          <Link to={'/'} onClick={handleLogout}>Выйти</Link>
        </MenuItem>
      </Menu>
    </div >
  );
}

export default DropDownMenu
