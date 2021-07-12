import { AppBar, Container, Theme, makeStyles, Link, Toolbar, Typography } from '@material-ui/core';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Search from './Search';
import DropDownMenu from './DropDownMenu';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from '../../redux/selectors';
import { logOut } from '../../redux/actions/AuthActions';

const useStyles = makeStyles((theme: Theme) => ({
  navigation: {
    flexGrow: 1,
    justifyContent: "center",
  },
  search: {
    width: 0,
    opacity: 0,
  },
  link: {
    marginRight: theme.spacing(3),
    fontSize: 18,
  }
}));

const Header = () => {

  const classes = useStyles();
  const location = useLocation();
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();

  const authLinks = [
    { label: 'Логин', path: '/login', },
    { label: 'Регистрация', path: '/register', }
  ];

  const generalLinks = [
    { label: 'Главная', path: '/', },
    { label: 'Создать пост ', path: '/create', }
  ];

  const userLinks = auth.accessToken ? generalLinks : authLinks;

  const isActive = (link: string) => location.pathname === link;

  const handleLogout = () => {
    dispatch(logOut());
  }

  return (
    <AppBar color="default" position="static" elevation={0}>
      <Container>
        <Toolbar disableGutters>
          <Typography variant="h6" align='left'>
            Logo
          </Typography>
          <Toolbar component="nav" variant="dense" className={classes.navigation}>
            123
          </Toolbar>
          <Search />
          {userLinks.map((link, i) => (
            <Link
              className={classes.link}
              component={RouterLink}
              key={i}
              to={link.path}
              color={isActive(link.path) ? 'secondary' : 'textSecondary'}
            >
              {link.label}
            </Link>
          ))}

          {auth.user?.role === 'admin' &&
            <Link
              className={classes.link}
              component={RouterLink}
              to="/category"
              color={isActive('/category') ? 'secondary' : 'textSecondary'}
            >
              Категории
            </Link>}

          {auth.user && <DropDownMenu handleLogout={handleLogout} user={auth.user} />}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
