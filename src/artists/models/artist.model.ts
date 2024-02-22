
import { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
const ArtistSchema = new Schema(
    {  
        _id: {
            type: String,
            default: uuidv4, 
        },
        name: String,
        grammy: Boolean,
    },
    {
        // timestamps: true, 
        collection: 'artists',
    },
);


export { ArtistSchema };

export interface Artist extends Document {
    name: string;
    grammy: boolean;
}