import express from 'express';
import AuthController from './controllers/AuthController';
import validator from './middleware/valid';

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
  res.json({ msg: 'Hello, world!' });
});

router.post('/register', validator.validRegister, AuthController.register);
router.post('/login', validator.validLogin, AuthController.login);
router.post('/google_login', AuthController.googleLogin);
router.get('/logout', AuthController.logout);

router.post('/active', AuthController.activateAccount);
router.get('/refresh_token', AuthController.refreshToken);

export default router;
