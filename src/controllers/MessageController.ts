import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Message } from '../models/Messages';

class MessageController {
    async send(request: Request, response: Response) {
        if (!request.session['userId']) {
            return response.status(400).json({
                error: "Can't send a message without logged session!"
            });
        }

        const sender = request.session['userId'];
        const receiver = request.params['id'];
        const { content } = request.body;

        const msgRepository = getRepository(Message);

        const message = msgRepository.create({
            sender,
            receiver,
            content,
        });

        await msgRepository.save(message);

        request.session['receiver'] = receiver;

        return response.status(200).json(message);
    }

    async showAll(request: Request, response: Response) {
        const msgRepository = getRepository(Message);

        const all = await msgRepository.find();

        return response.json(all);
    }

    async showChat(request: Request, response: Response) {
        if (!request.session['userId']) {
            return response.status(400).json({
                error: "Can't see chat without logged session!"
            });
        }

        const sender = request.session['userId'];
        const receiver = request.params['id'];

        const msgRepository = getRepository(Message);

        const chat = await msgRepository.find({
            where: [
                { sender, receiver },
                { sender: receiver, receiver: sender },
            ],
        });

        return response.status(200).json(chat);
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const msgRepository = getRepository(Message);

        try {
            msgRepository.delete(id);
        } catch (err) {
            return response.status(400).json({
                error: 'Error with database!',
            });
        }

        return response.status(200).json({
            message: 'Message deleted succesfully!',
        });
    }
}

export { MessageController };
