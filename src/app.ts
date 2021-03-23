import 'reflect-metadata';
import express from 'express';
import session from 'express-session';
import { router } from './routes';
import { v4 as uuid } from 'uuid';
import './database';

const app = express();
const sess = {
    genid: () => {
        return uuid();
    },
    secret: 'Leaf secret',
    name: 'uniqueSessionId',
    saveUninitialized: false,
    resave: false,
};

app.use(express.json());
app.use(session(sess));
app.use(router);

export { app };
