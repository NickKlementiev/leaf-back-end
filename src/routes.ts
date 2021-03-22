import { Router } from 'express';
import { LoginController } from './controllers/LoginController';
import { OrganizationController } from './controllers/OrganizationController';
import { UserController } from './controllers/UserController';

const router = Router();

const userController = new UserController();
const loginController = new LoginController();
const orgController = new OrganizationController();

router.get('/users', userController.show);
router.post('/users', userController.create);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.delete);

router.get('/login', loginController.login);
router.post('/authenticate', loginController.authenticate);
router.get('/logout', loginController.logout);

router.get('/organizations', orgController.show);
router.post('/organizations', orgController.create);
router.put('/organizations/:id', orgController.update);
router.delete('/organizations/:id', orgController.delete);

export { router };
