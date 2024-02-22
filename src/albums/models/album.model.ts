
import { Schema, Document } from 'mongoose';
import { Artist } from '../../artists/models/artist.model';
import { v4 as uuidv4 } from 'uuid';
const AlbumSchema = new Schema(
    {  
        _id: {
            type: String,
            default: uuidv4, 
        },
        name: String,
        year: Number,
        artistId : { type: String , ref: 'Artist' , default: null },
    },
    {
        // timestamps: true, 
        collection: 'albums',
    },
);

export { AlbumSchema };

export interface Album extends Document {
    name: string;
    year: number;
    artistId : [Artist];
}