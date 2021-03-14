import { Router } from 'express';
import { UserController } from './controllers/UserController';

const router = Router();

const userController = new UserController();

router.get('/users', (request, response) => {
    return response.json({
        message: 'Hello, world!',
    });
});

router.post('/users', userController.create);

export { router };
