import { Controller, Get, Post, Req, Param, Put, UseGuards, Body, Delete } from '@nestjs/common';
import { CreateTrackToFav } from '../dto/favorite.dto';
import { FavoriteService } from '../services/favorite.services';
import { get } from 'http';

@Controller('favs')
export class FavoriteController {
    constructor(private readonly favoriteRepository: FavoriteService) { }


    @Post('track/:id')
    async createFavTrack(@Param('id') id: string) {
        return await this.favoriteRepository.addTrackToFav(id);
    }

    @Post('album/:id')
    async createFavAlbum(@Param('id') id: string) {
        return await this.favoriteRepository.addAlbumToFav(id);
    }

    @Post('artist/:id')
    async createFavArtis(@Param('id') id: string) {
        return await this.favoriteRepository.addArtistsToFav(id);
    }

    @Delete('artist/:id')
    async deleteFavArtis(@Param('id') id: string) {
        return await this.favoriteRepository.deleteArtistsToFav(id);
    }
   
    @Delete('album/:id')
    async deleteFavAlbum(@Param('id') id: string) {
        return await this.favoriteRepository.deleteAlbumsToFav(id);
    }

    @Delete('track/:id')
    async deleteFavTrack(@Param('id') id: string) {
        return await this.favoriteRepository.deletTracksToFav(id);
    }

    
    @Get('all')
    async getAllFav() {
        return await this.favoriteRepository.getAllToFavs();
    }
}