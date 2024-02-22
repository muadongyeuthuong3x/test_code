import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto, UpdateArtistDto } from '../dto/artist.dto';
import { ArtistRepository } from '../repositories/artist.repository';
import { isValidUUID } from '../../common';
import { AlbumRepository } from '../../albums/repositories/album.repository';
import { FavoriteRepository } from '../../favorites/repositories/favorite.repository';

@Injectable()
export class ArtistService {
    constructor(
        private readonly artistRepository: ArtistRepository,
        private readonly albumRepository: AlbumRepository,
        private readonly favoriteRepository: FavoriteRepository,
    ) { }

    async create(createArtist: CreateArtistDto) {
        await this.artistRepository.create(createArtist);
        return {
            message: 'Artist created successfully',
            status: HttpStatus.CREATED,
        };
    }

    async getAllArtist() {
        return await this.artistRepository.findAll();
    }

    async getItemArtist(_id: string) {
        if (!isValidUUID(_id)) {
            return {
                message: 'ArtistId wrong for UUID',
                status: HttpStatus.BAD_REQUEST,
            };
        };
        const data = await this.artistRepository.findById(_id);
        if (data) {
            return data;
        } else {
            return {
                message: 'Id no have database',
                status: HttpStatus.NOT_FOUND,
            };
        }
    }

    async updateArtist(id: string, dataUpdate: UpdateArtistDto) {
        if (!isValidUUID(id)) {
            return {
                message: 'ArtistId wrong for UUID',
                status: HttpStatus.BAD_REQUEST,
            };
        };

        const finDataById = await this.artistRepository.findById(id);
        if (!finDataById) {
            return {
                message: 'Id no have database',
                status: HttpStatus.NOT_FOUND,
            };
        } else {
            const data = await this.artistRepository.findByIdAndUpdate(id, { ...dataUpdate });
            return data;
        }

    }


    async deleteArtistById(id: string) {
        if (!isValidUUID(id)) {
            return {
                message: 'trackId wrong for UUID',
                status: HttpStatus.BAD_REQUEST,
            };
        };
        const finDataById = await this.artistRepository.findById(id);
        if (!finDataById) {
            return {
                message: 'Id no have database',
                status: HttpStatus.NOT_FOUND,
            };
        }
         await this.artistRepository.deleteOne(id);
         await this.albumRepository.updateMany({ artistId: id }, { artistId: null });
        const dataFindFavorite = await this.favoriteRepository.findAll();
        if (dataFindFavorite.length > 0) {
            await this.favoriteRepository.updateMany({ _id: dataFindFavorite[0]._id }, {
                $pull: {
                    artists: id,
                },
            });
        }
        return {
            message: "Success",
            status: HttpStatus.NO_CONTENT,
        }
    }
}