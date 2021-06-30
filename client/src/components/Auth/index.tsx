import { Avatar, Container, Typography, Box, Grid, Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import clsx from 'clsx';
import { FC, ReactElement, useState } from 'react';
import { Link as LinkRouter } from 'react-router-dom';

import { useStyles } from './styles';

type AuthProps = {
  login: boolean;
  render?: (sms?: boolean) => ReactElement;
}

export const Auth: FC<AuthProps> = ({ login, render }) => {
  const classes = useStyles();
  const [sms, setSms] = useState(false);

  return (
    <Container component="main" maxWidth="xs">
      <Box mt={6} display="flex" border={1} p={3} borderRadius={8} borderColor="#eaeaea" flexDirection="column" alignItems="center">
        <Avatar variant="rounded" className={clsx(classes.avatar, classes.large)}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" align="center">
          {login ? 'Sign in' : 'Sign up'}
        </Typography>

        {render?.(sms)}

        <Grid container>
          {login &&
            <>
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
            </>
          }
          <Grid item xs={12}>
            <Typography align="center" variant="body2" paragraph className={classes.account}>
              <span>{login ? 'You don\'t have an account?' : 'Already have an account?'}&nbsp;</span>
              <LinkRouter to={login ? '/register' : '/login'}>
                <Link component="button" variant="body1">
                  {login ? 'Register Now' : 'Login now'}
                </Link>
              </LinkRouter>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
