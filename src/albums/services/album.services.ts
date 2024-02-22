import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto, UpdateAlbumDto } from '../dto/album.dto';
import { AlbumRepository } from '../repositories/album.repository';
import { isValidUUID } from '../../common';
import { TrackRepository } from '../../tracks/repositories/track.repository';
import { FavoriteRepository } from '../../favorites/repositories/favorite.repository';

@Injectable()
export class AlbumService {
    constructor(
        private readonly albumRepository: AlbumRepository,
        private readonly favoriteRepository: FavoriteRepository,
        private readonly trackRepository: TrackRepository,
    ) { }

    async create(createAlbum: CreateAlbumDto) {
        await this.albumRepository.create(createAlbum);
        return {
            message: 'Album created successfully',
            status: HttpStatus.CREATED,
        };
    }

    async getAllAlbum() {
        return await this.albumRepository.aggregate([
            {
                $lookup: {
                    from: 'artists',
                    localField: 'artistId',
                    foreignField: '_id',
                    as: 'artists',
                },
            },
            {
                $project: {
                    'artistId': 0,
                },
            },
        ]);
    }

    async getItemAlbum(_id: string) {
        if (!isValidUUID(_id)) {
            return {
                message: 'AlbumId wrong for UUID',
                status: HttpStatus.BAD_REQUEST,
            };
        };
        const data = await this.albumRepository.aggregate([
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
                $project: {
                    'artistId': 0,
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

    async updateAlbum(id: string, dataUpdate: UpdateAlbumDto) {
        if (!isValidUUID(id)) {
            return {
                message: 'AlbumId wrong for UUID',
                status: HttpStatus.BAD_REQUEST,
            };
        };

        const finDataById = await this.albumRepository.findById(id);
        if (!finDataById) {
            return {
                message: 'Id no have database',
                status: HttpStatus.NOT_FOUND,
            };
        } else {
            const data = await this.albumRepository.findByIdAndUpdate(id, { ...dataUpdate });
            return data;
        }

    }


    async deleteAlbumById(id: string) {
        if (!isValidUUID(id)) {
            return {
                message: 'AlbumId wrong for UUID',
                status: HttpStatus.BAD_REQUEST,
            };
        };
        const finDataById = await this.albumRepository.findById(id);
        if (!finDataById) {
            return {
                message: 'Id no have database',
                status: HttpStatus.NOT_FOUND,
            };
        }
        await this.albumRepository.deleteOne(id);

        await this.trackRepository.updateMany({ albumId: id }, { albumId: null });
        const dataFindFavorite = await this.favoriteRepository.findAll();
        if (dataFindFavorite.length > 0) {
            await this.favoriteRepository.updateMany({ _id: dataFindFavorite[0]._id }, {
                $pull: {
                    albums: id,
                },
            });
        }

        return {
            message: "Success",
            status: HttpStatus.NO_CONTENT,
        }
    }
}