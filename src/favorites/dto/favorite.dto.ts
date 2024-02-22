import {IsArray, IsNotEmpty, IsString} from 'class-validator';

export class CreateTrackToFav {
  @IsNotEmpty() tracks: string;
}


export class CreateAlbumToFav {
  @IsNotEmpty() albums: [string];
}

export class CreateArtistToFav {
  @IsNotEmpty() artists: [string];
}

