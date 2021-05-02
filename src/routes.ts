import { Request, Response, Router } from 'express';
import {GraphicsController} from './controllers/GraphicsController';
import { LoginController } from './controllers/LoginController';
import { MessageController } from './controllers/MessageController';
import { OrganizationController } from './controllers/OrganizationController';
import { UserController } from './controllers/UserController';

const router = Router();

const userController = new UserController();
const loginController = new LoginController();
const orgController = new OrganizationController();
const msgController = new MessageController();
const graphicsController = new GraphicsController();

router.get('/', (request: Request, response: Response) => {
    response.sendFile(__dirname + "/index.html");
});

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

router.get('/messages', msgController.showAll);
router.get('/messages/:id', msgController.showChat);
router.post('/messages/:id', msgController.send);
router.delete('/messages/:id', msgController.delete);

router.get('/graphics', graphicsController.show);
router.get('/graphics/examples', graphicsController.insertExampleGraphics);

export { router };
