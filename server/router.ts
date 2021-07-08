import express from 'express';
import AuthController from './controllers/AuthController';
import UserController from './controllers/UserController';
import { auth } from './middleware/auth';
import validator from './middleware/valid';

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
  res.json({ msg: 'Hello, world!' });
});

router.post('/register', validator.validRegister, AuthController.register);
router.post('/login', validator.validLogin, AuthController.login);
router.post('/google_login', AuthController.googleLogin);
router.post('/login_sms', AuthController.loginSMS);
router.post('/sms_verify', AuthController.smsVerify);
router.get('/logout', AuthController.logout);

router.post('/active', AuthController.activateAccount);
router.get('/refresh_token', AuthController.refreshToken);

router.patch('/user/:stuffToUpdate', auth, UserController.updateUser);
router.patch('/reset_password', auth, UserController.resetPassword);

export default router;
