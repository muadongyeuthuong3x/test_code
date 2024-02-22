import { Controller, Get, Post, Req, Param, Put, UseGuards, Body, Delete } from '@nestjs/common';
import { CreateAlbumDto, UpdateAlbumDto } from '../dto/album.dto';
import { AlbumService } from '../services/album.services';

@Controller('album')
export class ArtistController {
    constructor(private readonly albumService: AlbumService) { }


    @Post()
    async createArtist(@Body() createAlbum: CreateAlbumDto) {
        return await this.albumService.create(createAlbum);
    }

    @Get(':id')
    async getArtistById(@Param('id') id: string) {
        return await this.albumService.getItemAlbum(id);
    }

    @Get()
    async getArtist() {
        return await this.albumService.getAllAlbum();
    }

    @Put(':id')
    async updateArtist(@Param('id') id: string, @Body() data: UpdateAlbumDto) {
        return await this.albumService.updateAlbum(id, data);
    }

    @Delete(':id')
    async deleteArtist(@Param('id') id: string) {
        return await this.albumService.deleteAlbumById(id);
    }

}