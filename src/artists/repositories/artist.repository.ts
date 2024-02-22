import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../base.repository';
import { Artist } from '../models/artist.model';

@Injectable()
export class ArtistRepository extends BaseRepository<Artist> {
    constructor(
        @InjectModel('Artist')
        private readonly artistModel: Model<Artist>,
    ) {
        super(artistModel);
    }
}