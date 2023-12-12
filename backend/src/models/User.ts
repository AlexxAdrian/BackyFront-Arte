import { Schema, model, Document } from 'mongoose';

const schema = new Schema({
    username: { type: String, unique: true },
    password: String,
    email: { type: String, unique: true },
    
});

export interface IUser extends Document {
    username: string;
    password: string;
    email: string;
    
}

export default model<IUser>('User', schema);
