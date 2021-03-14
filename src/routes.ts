import { Router } from 'express';

const router = Router();

router.get('/users', (request, response) => {
    return response.json({
        message: 'Hello, world!',
    });
});

router.post('/users', (request, response) => {
    const data = request.body;

    return response.json(data);
});

export { router };
