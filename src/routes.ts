import { Router } from 'express';

const router = Router();

router.get('/', (request, response) => {
    return response.json({
        message: 'Hello, world!',
    });
});

router.post('/', (request, response) => {
    const data = request.body;

    return response.json(data);
});

export { router };
