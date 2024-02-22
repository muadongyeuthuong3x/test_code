import { IsNotEmpty  , IsNumber} from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty() name: string;
  artistId: string | null;
  albumId: string | null;
  @IsNumber()  duration : number;
}


export class UpdateTrackDto {
  @IsNotEmpty() name: string;
  artistId:  string | null;
  albumId: string | null;
  @IsNumber()  duration : number;
}