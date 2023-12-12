import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';
import { IUser } from '../models/User';

const User = model<IUser>('User', new Schema({
    username: String,
    password: String,
    email: String, 
}));


export const register = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { username, password, email } = req.body;

        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Formato de correo electrónico inválido' });
        }

       
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(409).json({ error: 'El nombre de usuario o correo electrónico ya está en uso. Por favor, elige otros.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, password: hashedPassword, email });
        await newUser.save();

        return res.json({
            message: 'Usuario registrado exitosamente',
            user: newUser
        });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const login = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ userId: user._id }, 'secret_key'); 
        return res.json({ token });
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

