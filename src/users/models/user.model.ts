
import { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
const UserSchema = new Schema(
    {  
        _id: {
            type: String,
            default: uuidv4, 
        },
        login: String,
        password: String,
        version: {
            type : Number,
            default:1
        },// integer number, increments on update
        createdAt: { type: Number, default: Date.now },
        updatedAt: { type: Number, default: Date.now },
    },
    {
        // timestamps: true, 
        collection: 'users',
    },
);

export { UserSchema };

export interface User extends Document {
    login: string;
    password: string;
    version: number; // integer number, increments on update
    createdAt: number; // timestamp of creation
    updatedAt: number; // timestamp of last update
}