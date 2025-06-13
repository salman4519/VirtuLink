import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { auth } from '../middleware/auth.middleware';

const router = Router();
// router.use('/',()=>console.log("hello rafan"))
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/forgot-password', AuthController.forgotPassword);
router.post('/reset-password',  AuthController.resetPassword);

export default router;