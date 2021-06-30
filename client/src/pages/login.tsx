import { Auth } from '../components/Auth';
import { SignIn } from '../components/Auth/SignIn';
import { SignInSMS } from '../components/Auth/SignInSMS';

const Login = () => {
  return (
    <Auth login render={(sms?: boolean) => !sms ? <SignIn /> : <SignInSMS />} />
  )
}

export default Login
