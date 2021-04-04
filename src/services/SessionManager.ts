import { getRepository } from 'typeorm';
import { Session } from '../models/Session';

class SessionManager {
    async clean() {
        const sessionsRepository = getRepository(Session);

        const sessions = await sessionsRepository.find();

        for (let session of sessions) {
            await sessionsRepository.delete(session.id);
        }
    }
}

export default new SessionManager();
