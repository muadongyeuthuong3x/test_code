import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../base.repository';
import { Track } from '../models/track.model';

@Injectable()
export class TrackRepository extends BaseRepository<Track> {
    constructor(
        @InjectModel('Track')
        private readonly trackModel: Model<Track>,
    ) {
        super(trackModel);
    }
}