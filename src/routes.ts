import { Router } from 'express';
import {LoginController} from './controllers/LoginController';
import { UserController } from './controllers/UserController';

const router = Router();

const userController = new UserController();
const loginController = new LoginController();

router.get('/users', userController.show);
router.post('/users', userController.create);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.delete);

router.get('/login', loginController.login);
router.post('/authenticate', loginController.authenticate);
router.get('/logout', loginController.logout);

export { router };
