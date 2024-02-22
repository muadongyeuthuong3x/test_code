import { Controller, Get, Post, Req, Param, Put, UseGuards, Body, Delete } from '@nestjs/common';
import { CreateTrackDto, UpdateTrackDto } from '../dto/track.dto';
import { TrackService } from '../services/track.services';

@Controller('track')
export class TrackController {
    constructor(private readonly trackService: TrackService) { }


    @Post()
    async createTrack(@Body() createTrack: CreateTrackDto) {
        return await this.trackService.create(createTrack);
    }

    @Get(':id')
    async getTrackById(@Param('id') id: string) {
        return await this.trackService.getItemTrack(id);
    }

    @Get()
    async getTrack() {
        return await this.trackService.getALlTrack();
    }

    @Put(':id')
    async updateTrack(@Param('id') id: string, @Body() data: UpdateTrackDto) {
        return await this.trackService.updateTrack(id, data);
    }

    @Delete(':id')
    async deleteTrack(@Param('id') id: string) {
        return await this.trackService.deleteTrackById(id);
    }

}