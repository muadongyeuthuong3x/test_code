import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../base.repository';
import { Album } from '../models/album.model';

@Injectable()
export class AlbumRepository extends BaseRepository<Album> {
    constructor(
        @InjectModel('Album')
        private readonly albumModel: Model<Album>,
    ) {
        super(albumModel);
    }
}