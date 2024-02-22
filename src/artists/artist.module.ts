import { MongooseModule } from '@nestjs/mongoose';
import { ArtistSchema } from './models/artist.model';
import { Global, Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { ArtistController } from './controllers/artist.controller';
import { ArtistService } from './services/track.services';
import { ArtistRepository } from './repositories/artist.repository';
import { AlbumRepository } from '../albums/repositories/album.repository';
import { AlbumSchema } from '../albums/models/album.model';
import { FavoriteSchema } from '../favorites/models/favorite.model';
import { TrackSchema } from '../tracks/models/track.model';
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
    ArtistService,
    ArtistRepository,
    AlbumRepository,
    FavoriteRepository
  ],
  exports: [ArtistService,],
})
export class ArtistModule { }