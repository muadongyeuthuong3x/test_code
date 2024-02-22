import { MongooseModule } from '@nestjs/mongoose';
import { AlbumSchema } from './models/album.model';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ArtistController } from './controllers/album.controller';
import { AlbumService } from './services/album.services';
import { AlbumRepository } from './repositories/album.repository';
import { ArtistSchema } from '../artists/models/artist.model';
import { FavoriteSchema } from '../favorites/models/favorite.model';
import { TrackSchema } from '../tracks/models/track.model';
import { TrackRepository } from '../tracks/repositories/track.repository';
import { ArtistRepository } from '../artists/repositories/artist.repository';
import { FavoriteRepository } from '../favorites/repositories/favorite.repository';

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
    ArtistController,
  ],
  providers: [
    AlbumService,
    AlbumRepository,
   
    FavoriteRepository,
    TrackRepository,
    ArtistRepository

  ],
  exports: [AlbumService],
})
export class AlbumModule { }