import { IsNotEmpty  , IsBoolean, IsNumber} from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty() name: string;
  @IsNumber() year: number;
  artistId: string | null;
}


export class UpdateAlbumDto {
  @IsNotEmpty() name: string;
  @IsNumber() year: number;
  artistId: string | null;
}