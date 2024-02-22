import { MongooseModule } from '@nestjs/mongoose';
import { TrackSchema } from './models/track.model';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TrackController } from './controllers/track.controller';
import { TrackService } from './services/track.services';
import { TrackRepository } from './repositories/track.repository';
import { AlbumSchema } from '../albums/models/album.model';
import { ArtistSchema } from '../artists/models/artist.model';
import { FavoriteRepository } from '../favorites/repositories/favorite.repository';
import { FavoriteSchema } from '../favorites/models/favorite.model';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {
        name: 'Track',
        schema: TrackSchema,
      },
      {
        name: 'Album',
        schema: AlbumSchema,
      },
      {
        name: 'Artist',
        schema: ArtistSchema,
      },
      {
        name: 'Favorite',
        schema: FavoriteSchema,
      },
    ]),
  ],
  controllers: [
    TrackController,
  ],
  providers: [
    TrackService,
    TrackRepository,
    FavoriteRepository
  ],
  exports: [TrackService,],
})
export class TrackModule { }