import { MongooseModule } from '@nestjs/mongoose';
import { FavoriteSchema } from './models/favorite.model';
import {AlbumSchema} from "../albums/models/album.model";
import {TrackSchema} from "../tracks/models/track.model";
import {ArtistSchema} from "../artists/models/artist.model";
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FavoriteController } from './controllers/favorite.controller';
import { FavoriteService } from './services/favorite.services';
import { FavoriteRepository } from './repositories/favorite.repository';
import { TrackRepository } from '../tracks/repositories/track.repository';
import { AlbumRepository } from '../albums/repositories/album.repository';
import { ArtistRepository } from '../artists/repositories/artist.repository';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {
        name: 'Favorite',
        schema: FavoriteSchema,
      },
      {
        name: 'Album',
        schema:AlbumSchema,
      },
      {
        name: 'Track',
        schema: TrackSchema,
      },
      {
        name: 'Artist',
        schema: ArtistSchema,
      },
    ]),
  ],
  controllers: [
    FavoriteController,
  ],
  providers: [
    FavoriteService,
    FavoriteRepository,
    TrackRepository,
    AlbumRepository,
    ArtistRepository
  ],
  exports: [FavoriteService,],
})
export class FavoriteModule { }