import express from 'express';
import ArticleController from './controllers/ArticleController';
import AuthController from './controllers/AuthController';
import CategoryController from './controllers/CategoryController';
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
router.patch('/user_change_name', auth, UserController.updateName);

router.route('/category')
  .post(auth, CategoryController.createCategory)
  .get(CategoryController.getCategories);

router.route('/category/:id')
  .patch(auth, CategoryController.updateCategory)
  .delete(auth, CategoryController.deleteCategory);

router.post('/article', auth, ArticleController.createArticle);
router.get('/home/articles', ArticleController.getHomeArticles);
router.get('/articles/:categoryId', ArticleController.getArticlesByCategory);
router.get('/article/:id', ArticleController.getArticleById);
router.patch('/article/:id', ArticleController.updateArticleById);

export default router;
