import { Button, Icon, makeStyles, Theme } from '@material-ui/core';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

const useStyles = makeStyles(({ palette, spacing }: Theme) => ({
  button: {
    width: '100%',
    marginTop: spacing(2),
    '& img': {
      width: 25,
      height: 25,
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      left: 16,
    }
  },
}));

export const SocialButton = () => {
  const classes = useStyles();
  const onSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    console.log(response);
  }

  const onFailure = (err: any) => {
    console.log(err);
  }

  return (
    <GoogleLogin
      clientId="303559888699-m3ebk21940sg2pspqbq3o45dfhv9emji.apps.googleusercontent.com"
      onSuccess={onSuccess}
      onFailure={onFailure}
      render={renderProps => (
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          disableElevation
          fullWidth
          className={classes.button}
          startIcon={
            <img src={`${process.env.PUBLIC_URL}/icons/google.svg`} alt="sdas" height={25} width={25} />
          }
        >
          Sign in with Google
        </Button>
      )}
      cookiePolicy={'single_host_origin'}
    />
  )
}
