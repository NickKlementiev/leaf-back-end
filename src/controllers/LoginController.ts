import { Request, Response } from 'express';

import { getRepository } from 'typeorm';
import { Session } from '../models/Session';
import { User } from '../models/User';

class LoginController {
    async authenticate(request: Request, response: Response) {
        const { username, password } = request.body;

        const usersRepository = getRepository(User);
        const sessionsRepository = getRepository(Session);

        const auth = await usersRepository.findOne({
            username,
            password,
        });

        if (!auth) {
            return response.status(400).send({
                error: 'Authentication failed!',
            });
        }

        const alreadyConnected = await sessionsRepository.findOne({
            userId: auth.id,
        });

        if (alreadyConnected) {
            return response.status(400).send({
                error: 'User already connected!',
            });
        }

        if (!request.session['username']) {
            request.session['userId'] = auth.id;
            request.session['username'] = username;
            request.session['name'] = auth.name;
            request.session['password'] = password;
            request.session.save();
        }

        const newSession = sessionsRepository.create({
            id: request.sessionID,
            userId: auth.id,
        });

        await sessionsRepository.save(newSession);

        return response.status(201).json({
            message: 'Authentication succesful!',
        });
    }

    async logout(request: Request, response: Response) {
        const sessionsRepository = getRepository(Session);

        const currentSession = await sessionsRepository.findOne({
            userId: request.session['userId'],
        });

        if (currentSession) {
            await sessionsRepository.delete({
                userId: currentSession.userId,
            });
        }

        if (!request.session['name']) {
            return response.status(401).json({
                error: 'Already logged out!',
            });
        }

        request.session.destroy(() => {
            return response.status(200).json({
                message: 'Logout succesful!',
            });
        });
    }

    async login(request: Request, response: Response) {
        if (!request.session['username']) {
            return response.status(401).json({
                error: 'Login failed!',
            });
        }

        request.session.reload(() => {
            // Recarrega sessão
        });

        return response.status(200).json({
            message: 'Welcome, ' + request.session['name'] + '!',
        });
    }
}

export { LoginController };
