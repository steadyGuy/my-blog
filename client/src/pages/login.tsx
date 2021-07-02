import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Auth } from '../components/Auth';
import { SignIn } from '../components/Auth/SignIn';
import { SignInSMS } from '../components/Auth/SignInSMS';
import { selectAuth } from '../redux/selectors';

const Login = () => {

  const auth = useSelector(selectAuth);
  const history = useHistory();

  useEffect(() => {
    if (auth.accessToken) {
      history.push('/')
    }
  }, [auth.accessToken, history]);

  return (
    <Auth login render={(sms?: boolean) => !sms ? <SignIn /> : <SignInSMS />} />
  )
}

export default Login
