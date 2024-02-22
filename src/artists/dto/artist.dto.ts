import { IsNotEmpty  , IsBoolean} from 'class-validator';

export class CreateArtistDto {
  @IsNotEmpty() name: string;
  @IsBoolean() grammy: boolean;
}


export class UpdateArtistDto {
  @IsNotEmpty() name: string;
  @IsBoolean() grammy: boolean;
}