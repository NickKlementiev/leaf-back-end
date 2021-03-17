import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';

class UserController {
    async create(request: Request, response: Response) {
        const { name, password } = request.body;

        const usersRepository = getRepository(User);

        const userAlreadyExists = await usersRepository.findOne({
            name,
        });

        if (userAlreadyExists) {
            return response.status(400).json({
                error: 'User already exists!',
            });
        }

        const user = usersRepository.create({
            name,
            password,
        });

        await usersRepository.save(user);

        return response.status(201).json(user);
    }

    async show(request: Request, response: Response) {
        const usersRepository = getRepository(User);

        const all = await usersRepository.find();

        return response.json(all);
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const usersRepository = getRepository(User);

        try {
            await usersRepository.delete(id);
        } catch (error) {
            console.log(error);
            return response.status(400).json({
                message: 'Error with database',
            });
        }

        return response.status(200).json({
            message: 'User deleted succesfully',
        });
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const { name, password } = request.body;

        const usersRepository = getRepository(User);

        const sameData = await usersRepository.findOne({ name, password });

        if (sameData) {
            return response.status(400).json({
                message: 'New data cannot be as same as old data!',
            });
        }

        try {
            await usersRepository.update(id, { name, password });
        } catch (error) {
            console.log(error);
            return response.status(400).json({
                message: 'Error with database',
            });
        }

        const updated = await usersRepository.findOne({ id });

        return response.status(201).json(updated);
    }
}

export { UserController };
