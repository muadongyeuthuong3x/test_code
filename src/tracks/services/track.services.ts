import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto, UpdateTrackDto } from '../dto/track.dto';
import { TrackRepository } from '../repositories/track.repository';
import { isValidUUID } from '../../common';
import { FavoriteRepository } from '../../favorites/repositories/favorite.repository';

@Injectable()
export class TrackService {
    constructor(
        private readonly trackRepository: TrackRepository,
        private readonly favoriteRepository: FavoriteRepository,
    ) { }

    async create(createTrack: CreateTrackDto) {
        await this.trackRepository.create(createTrack);
        return {
            message: 'Track created successfully',
            status: HttpStatus.CREATED,
        };
    }

    async getALlTrack() {
        return await this.trackRepository.aggregate([
            {
                $lookup: {
                    from: 'artists',
                    localField: 'artistId',
                    foreignField: '_id',
                    as: 'artists',
                },
            },
            {
                $lookup: {
                    from: 'albums',
                    localField: 'albumId',
                    foreignField: '_id',
                    as: 'album',
                },
            },
            {
                $project: {
                    'artistId': 0,
                    'albumId': 0
                },
            },
        ]);
    }

    async getItemTrack(_id: string) {
        if (!isValidUUID(_id)) {
            return {
                message: 'trackId wrong for UUID',
                status: HttpStatus.BAD_REQUEST,
            };
        };
        const data = await this.trackRepository.aggregate([
            {
                $match: {
                    _id: _id,
                },
            },
            {
                $lookup: {
                    from: 'artists',
                    localField: 'artistId',
                    foreignField: '_id',
                    as: 'artists',
                },
            },
            {
                $lookup: {
                    from: 'albums',
                    localField: 'albumId',
                    foreignField: '_id',
                    as: 'album',
                },
            },
            {
                $project: {
                    'artistId': 0,
                    'albumId': 0
                },
            },
        ]);

        if (data.length > 0) {
            return data[0];
        } else {
            return {
                message: 'Id no have database',
                status: HttpStatus.NOT_FOUND,
            };
        }
    }

    async updateTrack(id: string, dataUpdate: UpdateTrackDto) {
        if (!isValidUUID(id)) {
            return {
                message: 'trackId wrong for UUID',
                status: HttpStatus.BAD_REQUEST,
            };
        };
    
        const finDataById = await this.trackRepository.findById(id);
        if (!finDataById) {
            return {
                message: 'Id no have database',
                status: HttpStatus.NOT_FOUND,
            };
        } else {
            const data = await this.trackRepository.findByIdAndUpdate(id, { ...dataUpdate });
            return data;
        }

    }


    async deleteTrackById(id: string) {
        if (!isValidUUID(id)) {
            return {
                message: 'trackId wrong for UUID',
                status: HttpStatus.BAD_REQUEST,
            };
        };
        const finDataById = await this.trackRepository.findById(id);
        if (!finDataById) {
            return {
                message: 'Id no have database',
                status: HttpStatus.NOT_FOUND,
            };
        }
        await this.trackRepository.deleteOne(id);
        const dataFindFavorite = await this.favoriteRepository.findAll();
        if (dataFindFavorite.length > 0) {
            await this.favoriteRepository.updateMany({ _id: dataFindFavorite[0]._id }, {
                $pull: {
                    tracks: id,
                },
            });
        }
        return {
            message: "Success",
            status: HttpStatus.NO_CONTENT,
        }
    }
}