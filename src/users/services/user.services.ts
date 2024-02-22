import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUser } from '../dto/user.dto';
import { UserRepository } from '../repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { isValidUUID } from '../../common';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    async checkExitsLogin(login: string) {
        return await this.userRepository.findByCondition({ login });
    }
    async create(createUser: CreateUserDto) {
        const dataFindByLogin = await this.checkExitsLogin(createUser.login);
        if (dataFindByLogin) {
            return {
                message: 'Login exits in database',
                status: HttpStatus.BAD_REQUEST,
            };
        }
        createUser.password = await bcrypt.hash(createUser.password, 10);
        await this.userRepository.create(createUser);
        return {
            message: 'User created successfully',
            status: HttpStatus.CREATED,
        };
    }

    async getALlUser() {
        return await this.userRepository.aggregate([{ $project: { password: 0 } }]);
    }

    async getItemUser(_id: string) {
        if (!isValidUUID(_id)) {
            return {
                message: 'userId wrong for UUID',
                status: HttpStatus.BAD_REQUEST,
            };
        };
        const data = await this.userRepository.findById(_id, { select: '-password' });
        if (data) {
            return data;
        } else {
            return {
                message: 'Id no have database',
                status: HttpStatus.NOT_FOUND,
            };
        }
    }

    async updateUser(id: string, dataUpdate: UpdateUser) {
        if (!isValidUUID(id)) {
            return {
                message: 'userId wrong for UUID',
                status: HttpStatus.BAD_REQUEST,
            };
        };
        const { passwordOld, passwordNew } = dataUpdate
        const passwordNewHash = await bcrypt.hash(passwordNew, 10);
        const finDataById = await this.userRepository.findById(id);
        if (!finDataById) {
            return {
                message: 'Id no have database',
                status: HttpStatus.NOT_FOUND,
            };
        } else if (!bcrypt.compareSync(passwordOld, finDataById.password)) {
            return {
                message: 'PasswordOld is wrong',
                status: HttpStatus.FORBIDDEN,
            };
        } else {
            const data = await this.userRepository.findByIdAndUpdate(id, { password: passwordNewHash, version: finDataById.version + 1 });
            data.password = null;
            return data;
        }

    }


    async deleteUserById(id: string) {
        if (!isValidUUID(id)) {
            return {
                message: 'userId wrong for UUID',
                status: HttpStatus.BAD_REQUEST,
            };
        };
        const finDataById = await this.userRepository.findById(id);
        if (!finDataById) {
            return {
                message: 'Id no have database',
                status: HttpStatus.NOT_FOUND,
            };
        }
        await this.userRepository.deleteOne(id);
        return {
            message: "Success",
            status: HttpStatus.NO_CONTENT,
        }
    }
}