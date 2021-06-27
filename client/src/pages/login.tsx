import { Avatar, Container, Typography, Box, makeStyles, Grid, Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import clsx from 'clsx';
import { useState } from 'react';
import { Link as LinkRouter } from 'react-router-dom';
import { SignIn } from '../components/Auth/SignIn';
import { SignInSMS } from '../components/Auth/SignInSMS';

const useStyles = makeStyles((theme) => ({
  avatar: {
    marginBottom: theme.spacing(1)
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  account: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
  },
}));

const Login = () => {
  const classes = useStyles();
  const [sms, setSms] = useState(false);

  return (
    <Container component="main" maxWidth="xs">
      <Box mt={6} display="flex" border={1} p={3} borderRadius={8} borderColor="#eaeaea" flexDirection="column" alignItems="center">
        <Avatar variant="rounded" className={clsx(classes.avatar, classes.large)}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" align="center">
          Sign in
        </Typography>

        {!sms ? <SignIn /> : <SignInSMS />}

        <Grid container>
          <Grid item xs>
            <LinkRouter to="/forgot_password">
              <Link component="button" variant="body2">
                Forgot password?
              </Link>
            </LinkRouter>
          </Grid>
          <Grid item>
            <Link component="button" variant="body2" onClick={() => setSms(prevSms => !prevSms)}>
              {!sms ? 'Sign in with SMS' : 'Sign in with password'}
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Typography align="center" variant="body2" paragraph className={classes.account}>
              <span>You don't have an account?&nbsp;</span>
              <LinkRouter to="/forgot_password">
                <Link component="button" variant="body1">
                  Register Now
                </Link>
              </LinkRouter>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Login
