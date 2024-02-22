import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../base.repository';
import { Favorite } from '../models/favorite.model';

@Injectable()
export class FavoriteRepository extends BaseRepository<Favorite> {
    constructor(
        @InjectModel('Favorite')
        private readonly favoriteModel: Model<Favorite>,
    ) {
        super(favoriteModel);
    }
}