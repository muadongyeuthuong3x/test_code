
import { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Artist } from '../../artists/models/artist.model';
import { Album } from '../../albums/models/album.model';
const TrackSchema = new Schema(
    {  
        _id: {
            type: String,
            default: uuidv4, 
        },
        name: String,
        artistId :{ type: String , ref: 'Artist' , default: null },
        albumId : { type: String , ref: 'Album' , default: null },
        duration : Number
    },
    {
        // timestamps: true, 
        collection: 'tracks',
    },
);


export { TrackSchema };

export interface Track extends Document {
    name: string;
    duration: number;
    artistId : [Artist];
    albumId : [Album];
}