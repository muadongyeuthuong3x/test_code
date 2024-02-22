import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './users/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TrackModule } from './tracks/track.module';
import { ArtistModule } from './artists/artist.module';
import { AlbumModule } from './albums/album.module';
import {FavoriteModule} from './favorites/favorite.module';

@Module({
  imports: [ConfigModule.forRoot(),
  MongooseModule.forRoot(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    poolSize: 5,
  }), UserModule, TrackModule , ArtistModule ,AlbumModule ,FavoriteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }