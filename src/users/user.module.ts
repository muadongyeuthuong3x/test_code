import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './models/user.model';
import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
// import { UserService } from './services/user.service';
// import { AuthService } from './services/auth.service';
// import { AuthController } from './controllers/auth.controller';
// import { UserRepository } from './repositories/user.repository';
// import { UserController } from './controllers/user.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.services';
import { UserRepository } from './repositories/user.repository';

@Module({
    imports: [
      ConfigModule.forRoot(),
      MongooseModule.forFeature([
        {
          name: 'User',
          schema: UserSchema,
        },
      ]),
      JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get('SECRETKEY'),
          signOptions: {
            expiresIn: configService.get('EXPIRESIN'),
          },
        }),
        inject: [ConfigService],
      }),
    ],
    controllers: [
        UserController,
    ],
    providers: [
        UserService,
        UserRepository
    ],
    exports: [ UserService, ],
  })
  export class UserModule {}