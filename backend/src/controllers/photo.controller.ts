import { Request, Response } from 'express';
import fs from 'fs-extra';
import path from 'path';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { model, Schema, Document } from 'mongoose';
import { IPhoto } from '../models/Photo';

const Photo = model<IPhoto>('Photo', new Schema({
    title: String,
    description: String,
    imagePath: String,
    userId: String 
}));

export const createPhoto = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { title, description } = req.body;

        const imagePath = req.file ? req.file.path : undefined;

        if (!imagePath) {
            return res.status(400).json({ error: 'No se ha subido ningún archivo' });
        }

        const newPhoto = new Photo({
            title,
            description,
            imagePath,
            userId: req.body.userId,
        });

        await newPhoto.save();

        return res.json({
            message: 'Foto guardada exitosamente',
            photo: newPhoto
        });
    } catch (error) {
        console.error('Error al crear la foto:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getPhotos = async (req: Request, res: Response): Promise<Response> => {
    try {
        const photos = await Photo.find();
        return res.json(photos);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getPhoto = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const photo = await Photo.findById(id);

        if (!photo) {
            return res.status(404).json({ error: 'Foto no encontrada' });
        }

        return res.json(photo);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getUserPhotos = async (req: Request, res: Response) => {
    const userId = req.params.userId;
  
    try {
        console.log('UserID:', userId); 

        const userPhotos = await Photo.find({ userId: userId });
        console.log('User Photos:', userPhotos);

        res.json(userPhotos);
    } catch (error) {
        console.error('Error al obtener las fotos del usuario:', error);
        res.status(500).json({ message: 'Error al obtener las fotos del usuario', error });
    }
};

export const deletePhoto = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const photo = await Photo.findByIdAndDelete(id) as IPhoto;

        if (!photo) {
            return res.status(404).json({ error: 'Foto no encontrada' });
        }

        await fs.unlink(path.resolve(photo.imagePath));

        return res.json({ message: 'Foto eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar la foto:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updatePhoto = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        if (title || description || req.file) {
            const updateFields: Record<string, any> = {};

            if (title) {
                updateFields.title = title;
            }

            if (description) {
                updateFields.description = description;
            }

            if (req.file) {
                const oldPhoto = await Photo.findById(id) as IPhoto;

                await fs.unlink(path.resolve(oldPhoto.imagePath));

                updateFields.imagePath = req.file.path;
            }

            const updatedPhoto = await Photo.findByIdAndUpdate(id, updateFields, { new: true });

            return res.json({
                message: 'Foto actualizada exitosamente',
                photo: updatedPhoto
            });
        } else {
            return res.json({
                message: 'No se han proporcionado cambios',
                photo: null
            });
        }
    } catch (error) {
        console.error('Error al actualizar la foto:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const searchPhotos = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { query } = req.params;
        const regex = new RegExp(query, 'i'); 

        const foundPhotos = await Photo.find({
            $or: [
                { title: { $regex: regex } },
                { description: { $regex: regex } },
            ],
        });

        return res.json(foundPhotos);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};