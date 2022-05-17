import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from 'src/database/user.model';
import { Token } from 'src/database/token.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';


@Module({
  imports: [
    SequelizeModule.forFeature([User, Token]),
    forwardRef(() => AuthModule),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [
    UsersService
  ]
})
export class UsersModule {}
