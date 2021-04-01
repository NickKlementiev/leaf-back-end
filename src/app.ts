import 'reflect-metadata';
import express from 'express';
import session from 'express-session';
import { router } from './routes';
import { v4 as uuid } from 'uuid';
import cors from 'cors';
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
    cookie: {
        maxAge: 600000,
        secure: false,
    },
};

app.use(
    cors({
        origin: ['http://localhost:3000'],
        credentials: true,
        exposedHeaders: ['set-cookie'],
    })
);
app.use(express.json());
app.use(session(sess));
app.use(router);

export { app };
