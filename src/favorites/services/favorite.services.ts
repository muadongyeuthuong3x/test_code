import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateTrackToFav, CreateAlbumToFav, CreateArtistToFav } from '../dto/favorite.dto';
import { FavoriteRepository } from '../repositories/favorite.repository';
import { TrackRepository } from '../../tracks/repositories/track.repository';
import { AlbumRepository } from '../../albums/repositories/album.repository';
import { ArtistRepository } from '../../artists/repositories/artist.repository';
import { isValidUUID } from '../../common';


@Injectable()
export class FavoriteService {
    constructor(
        private readonly favoriteRepository: FavoriteRepository,
        private readonly trackRepository: TrackRepository,
        private readonly albumRepository: AlbumRepository,
        private readonly artistRepository: ArtistRepository,
    ) { }

    async addTrackToFav(id: string) {

        if (!isValidUUID(id)) {
            return {
                message: 'TrackId wrong for UUID',
                status: HttpStatus.BAD_REQUEST,
            };
        };

        const checkIdTrack = await this.trackRepository.findById(id);
        if (!checkIdTrack) {
            return {
                message: 'IdTrack no exits in database',
                status: HttpStatus.UNPROCESSABLE_ENTITY,
            };
        }
        const dataCheckExitsCreate = await this.favoriteRepository.findAll();

        if (dataCheckExitsCreate.length > 0) {
            const check = await this.favoriteRepository.aggregate([
                {
                    $match: {
                        tracks: {
                            $elemMatch: {
                                $eq: id
                            }
                        }
                    }
                }
            ]);

            if (check.length < 1) {
                dataCheckExitsCreate[0].tracks.push(id);
                await this.favoriteRepository.findByIdAndUpdate(dataCheckExitsCreate[0]._id, { ...dataCheckExitsCreate[0] });
            }
        } else {
            await this.favoriteRepository.create({ tracks: [id] });
        }

        return {
            message: 'track add successfully',
            status: HttpStatus.CREATED,
        };
    }


    async addAlbumToFav(id: string) {
        if (!isValidUUID(id)) {
            return {
                message: 'AlbumId wrong for UUID',
                status: HttpStatus.BAD_REQUEST,
            };
        };
        const checkIdAlbum = await this.albumRepository.findById(id);
        if (!checkIdAlbum) {
            return {
                message: 'IdAlbum no exits in database',
                status: HttpStatus.UNPROCESSABLE_ENTITY,
            };
        }
        const dataCheckExitsCreate = await this.favoriteRepository.findAll();
        if (dataCheckExitsCreate.length > 0) {
            const check = await this.favoriteRepository.aggregate([
                {
                    $match: {
                        albums: {
                            $elemMatch: {
                                $eq: id
                            }
                        }
                    }
                }
            ]);

            if (check.length < 1) {
                dataCheckExitsCreate[0].albums.push(id);
                await this.favoriteRepository.findByIdAndUpdate(dataCheckExitsCreate[0]._id, { ...dataCheckExitsCreate[0] });
            }
        } else {
            await this.favoriteRepository.create({ albums: [id] });
        }

        return {
            message: 'Album add successfully',
            status: HttpStatus.CREATED,
        };
    }

    async addArtistsToFav(id: string) {
        if (!isValidUUID(id)) {
            return {
                message: 'Artists wrong for UUID',
                status: HttpStatus.BAD_REQUEST,
            };
        };

        const checkIdArtists = await this.artistRepository.findById(id);
        if (!checkIdArtists) {
            return {
                message: 'Artists no exits in database',
                status: HttpStatus.UNPROCESSABLE_ENTITY,
            };
        }
        const dataCheckExitsCreate = await this.favoriteRepository.findAll();

        if (dataCheckExitsCreate.length > 0) {
            const check = await this.favoriteRepository.aggregate([
                {
                    $match: {
                        artists: {
                            $elemMatch: {
                                $eq: id
                            }
                        }
                    }
                }
            ]);

            if (check.length < 1) {
                dataCheckExitsCreate[0].artists.push(id);
                await this.favoriteRepository.findByIdAndUpdate(dataCheckExitsCreate[0]._id, { ...dataCheckExitsCreate[0] });
            }
        } else {
            await this.favoriteRepository.create({ artists: [id] });
        }

        return {
            message: 'Artists add successfully',
            status: HttpStatus.CREATED,
        };
    }


    async deleteAlbumsToFav(id: string) {
        if (!isValidUUID(id)) {
            return {
                message: 'albums wrong for UUID',
                status: HttpStatus.BAD_REQUEST,
            };
        };

        const dataFindFavorite = await this.favoriteRepository.aggregate([
            {
                $match: {
                    albums: {
                        $elemMatch: {
                            $eq: id
                        }
                    }
                }
            }
        ]);

        if (dataFindFavorite.length < 1) {
            return {
                message: 'Artist is not favorite',
                status: HttpStatus.NOT_FOUND,
            };
        }
     
        await this.favoriteRepository.updateMany({ _id: dataFindFavorite[0]._id }, {
            $pull: {
                albums: id,
            },
        });

        return {
            message: 'Album delete successfully',
            status: HttpStatus.CREATED,
        };
    }

    async deletTracksToFav(id: string) {
        if (!isValidUUID(id)) {
            return {
                message: 'tracks wrong for UUID',
                status: HttpStatus.BAD_REQUEST,
            };
        };

        const dataFindFavorite = await this.favoriteRepository.aggregate([
            {
                $match: {
                    tracks: {
                        $elemMatch: {
                            $eq: id
                        }
                    }
                }
            }
        ]);

        if (dataFindFavorite.length < 1) {
            return {
                message: 'Artist is not favorite',
                status: HttpStatus.NOT_FOUND,
            };
        }
     
        await this.favoriteRepository.updateMany({ _id: dataFindFavorite[0]._id }, {
            $pull: {
                tracks: id,
            },
        });

        return {
            message: 'Track delete successfully',
            status: HttpStatus.CREATED,
        };
    }

    async deleteArtistsToFav(id: string) {
        if (!isValidUUID(id)) {
            return {
                message: 'Artists wrong for UUID',
                status: HttpStatus.BAD_REQUEST,
            };
        };

        const dataFindFavorite = await this.favoriteRepository.aggregate([
            {
                $match: {
                    artists: {
                        $elemMatch: {
                            $eq: id
                        }
                    }
                }
            }
        ]);

        if (dataFindFavorite.length < 1) {
            return {
                message: 'Artist is not favorite',
                status: HttpStatus.NOT_FOUND,
            };
        }
     
        await this.favoriteRepository.updateMany({ _id: dataFindFavorite[0]._id }, {
            $pull: {
                artists: id,
            },
        });

        return {
            message: 'Artist delete successfully',
            status: HttpStatus.CREATED,
        };
    }

    async getAllToFavs(){
     return   await this.favoriteRepository.aggregate([
            {
                $lookup: {
                    from: 'artists',
                    localField: 'artists',
                    foreignField: '_id',
                    as: 'artist',
                },
            },
            {
                $lookup: {
                    from: 'albums',
                    localField: 'albums',
                    foreignField: '_id',
                    as: 'album',
                },
            },
            {
                $lookup: {
                    from: 'tracks',
                    localField: 'tracks',
                    foreignField: '_id',
                    as: 'track',
                },
            },
            {
                $project: {
                    'tracks': 0,
                    'artists': 0,
                    'albums': 0
                },
            },
        ]);
    }

}