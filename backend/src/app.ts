import express, { Application, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import indexRoutes from './routes/index';

const app: Application = express();

const port: number = parseInt(process.env.PORT as string, 10) || 4000;
app.set('port', port);

app.use(morgan('dev'));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', indexRoutes);

app.use('/api', (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: 'Acceso no autorizado' });
    } else {
        console.error('Error en la ruta /api:', err.stack);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.use('/uploads', express.static(path.resolve('uploads')));
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
