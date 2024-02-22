
import { Schema, Document , Mongoose, model  } from 'mongoose';
import { Artist } from '../../artists/models/artist.model';
import { Track } from '../../tracks/models/track.model';
import { v4 as uuidv4 } from 'uuid';
import { Album } from '../../albums/models/album.model';
const FavoriteSchema = new Schema(
    {     _id: {
        type: String,
        default: uuidv4, 
    },
        artists: [{ type: String , ref: 'Artist' }],
        albums: [{ type: String , ref: 'Album' }],
        tracks: [{ type: String , ref: 'Track' }],
    },
    {
        collection: 'favorites',
    },
);

 
export { FavoriteSchema };


export interface Favorite extends Document {
    artists :  [String];
    albums : [String];
    tracks: [String];
}