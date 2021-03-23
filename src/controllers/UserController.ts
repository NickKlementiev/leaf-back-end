import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import {Organization} from '../models/Organization';
import { User } from '../models/User';

class UserController {
    async create(request: Request, response: Response) {
        const { orgId, username, name, password } = request.body;

        const usersRepository = getRepository(User);
        const orgsRepository = getRepository(Organization);

        const userAlreadyExists = await usersRepository.findOne({
            username,
        });

        if (userAlreadyExists) {
            return response.status(400).json({
                error: 'User already exists!',
            });
        }

        const orgExist = await orgsRepository.findOne({
            id: orgId,
        });

        if (!orgExist) {
            return response.status(400).json({
                error: "Organization with given ID doesn't exist!"
            });
        }

        const user = usersRepository.create({
            orgId,
            username,
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
            await usersRepository.delete({ id });
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
        const { orgId, username, name, password } = request.body;

        const usersRepository = getRepository(User);

        const sameUser = await usersRepository.findOne({ username });

        if (sameUser) {
            return response.status(400).json({
                message: 'Username already taken!',
            });
        }

        const sameData = await usersRepository.findOne({
            orgId,
            username,
            name,
            password,
        });

        if (sameData) {
            return response.status(400).json({
                message: 'New data cannot be as same as old data!',
            });
        }

        try {
            await usersRepository.update({ id }, { orgId, username, name, password });
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
