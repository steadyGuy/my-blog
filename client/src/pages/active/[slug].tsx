import { createStyles, makeStyles, Paper, Theme, Typography, Zoom, Container, Button } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IParams } from '../../interfaces/user';
import { postAPI } from '../../utils/fetchData';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: '50%',
      transform: 'translateY(-50%)',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      padding: theme.spacing(4),
      fontSize: 62,
    },
    subText: {
      marginBottom: theme.spacing(4),
    },
    title: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    link: {
      color: '#fff',
      textDecoration: 'none',
    }
  }),
);

const Active = () => {
  const classes = useStyles();
  const { slug }: IParams = useParams();
  const [errors, setErrors] = useState('');
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (slug) {
      postAPI('active', { token: slug })
        .then(res => {
          console.log(res.error)
          if (res?.error.message) {
            return setErrors(res.error.message);
          }
          setSuccess(res.message);
        })
        .catch(err => {
          setErrors(err?.resposne?.data.message);
          console.log(err, 'error')
        })
    }

  }, [slug])
  return (
    <Zoom in={true}>
      <Container maxWidth="sm">
        <Paper className={classes.paper}>
          {!errors ? <CheckCircleOutlineIcon fontSize="inherit" color="primary" /> :
            <ErrorOutlineIcon fontSize="inherit" color="error" />}
          <Typography align="center" variant="h3" className={classes.title}>
            {!errors && success ? success : errors}
          </Typography>
          <Typography align="center" variant="body1" className={classes.subText}>
            {success && 'Теперь вы можете продолжить работать на сайте как авторизированный пользователь'}
          </Typography>
          <Button variant="contained" color="primary">
            <Link to="/" className={classes.link}>
              На главную
            </Link>
          </Button>
        </Paper>
      </Container>
    </Zoom>
  )
}

export default Active
