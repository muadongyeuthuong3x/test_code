import { Controller, Get, Post, Req, Param, Put, UseGuards, Body, Delete } from '@nestjs/common';
import { CreateArtistDto, UpdateArtistDto } from '../dto/artist.dto';
import { ArtistService } from '../services/track.services';

@Controller('artist')
export class ArtistController {
    constructor(private readonly artistService: ArtistService) { }


    @Post()
    async createArtist(@Body() createTrack: CreateArtistDto) {
        return await this.artistService.create(createTrack);
    }

    @Get(':id')
    async getArtistById(@Param('id') id: string) {
        return await this.artistService.getItemArtist(id);
    }

    @Get()
    async getArtist() {
        return await this.artistService.getAllArtist();
    }

    @Put(':id')
    async updateArtist(@Param('id') id: string, @Body() data: UpdateArtistDto) {
        return await this.artistService.updateArtist(id, data);
    }

    @Delete(':id')
    async deleteArtist(@Param('id') id: string) {
        return await this.artistService.deleteArtistById(id);
    }

}