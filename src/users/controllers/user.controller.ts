import { Controller, Get, Post, Req, Param, Put, UseGuards, Body, Delete } from '@nestjs/common';
import { CreateUserDto, UpdateUser } from '../dto/user.dto';
import { UserService } from '../services/user.services';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }


    @Post()
    async createUser(@Body() createUser: CreateUserDto) {
        return await this.userService.create(createUser);
    }

    @Get(':id')
    async getUserById(@Param('id') id: string) {
        return await this.userService.getItemUser(id);
    }

    @Get()
    async getUser() {
        return await this.userService.getALlUser();
    }

    @Put(':id')
    async updateUser(@Param('id') id: string , @Body() data: UpdateUser) {
        return await this.userService.updateUser(id  , data);
    }
    
    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        return await this.userService.deleteUserById(id);
    }

}