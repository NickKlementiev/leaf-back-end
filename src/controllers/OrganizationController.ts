import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Organization } from '../models/Organization';

class OrganizationController {
    async create(request: Request, response: Response) {
        const { id, name } = request.body;

        const orgsRepository = getRepository(Organization);

        const orgAlreadyExists = await orgsRepository.findOne({ id });

        if (orgAlreadyExists) {
            return response.status(400).json({
                error: 'An organization with the same ID already exists!',
            });
        }

        const org = orgsRepository.create({
            id,
            name,
        });

        await orgsRepository.save(org);

        return response.status(200).json(org);
    }

    async show(request: Request, response: Response) {
        const orgsRepository = getRepository(Organization);

        const all = await orgsRepository.find();

        response.status(200).json(all);
    }

    async update(request: Request, response: Response) {
        const oldId = request.params['id'];

        const { id, name } = request.body;

        const orgsRepository = getRepository(Organization);

        const sameID = await orgsRepository.findOne({ id });

        if (oldId != id && sameID) {
            return response.status(400).json({
                error: 'An organization with the same ID already exists!',
            });
        }

        try {
            await orgsRepository.update(oldId, { id, name });
        } catch (error) {
            console.log(error);
            return response.status(400).json({
                message: 'Error with database',
            });
        }

        const updated = await orgsRepository.findOne({ id });

        return response.status(200).json(updated);
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const orgsRepository = getRepository(Organization);

        try {
            await orgsRepository.delete({ id });
        } catch (error) {
            console.log(error);
            return response.status(400).json({
                message: 'Error with database',
            });
        }

        return response.status(200).json({
            message: 'Organization deleted succesfully',
        });
    }
}

export { OrganizationController };
