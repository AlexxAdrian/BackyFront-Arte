import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const AUTH_HEADER = 'Authorization';
const SECRET_KEY = 'secret_key'; 

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header(AUTH_HEADER)?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Acceso no autorizado - Falta el token de autorización' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as { userId: string };
        req.body.userId = decoded.userId;
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ error: 'Token expirado' });
        }
        return res.status(401).json({ error: 'Token inválido' });
    }
};

