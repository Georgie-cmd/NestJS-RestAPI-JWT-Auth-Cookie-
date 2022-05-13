import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from 'src/database/user.model';
import { Token } from 'src/database/token.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { LocalStrategyService } from './local-strategy/local-strategy.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategyService } from './jwt-strategy/jwt-strategy.service';


@Module({
  imports: [
    SequelizeModule.forFeature([User, Token]),
    forwardRef(() => AuthModule),
    PassportModule
  ],
  providers: [UsersService, LocalStrategyService, JwtStrategyService],
  controllers: [UsersController],
  exports: [
    UsersService,
    LocalStrategyService,
    JwtStrategyService
  ]
})
export class UsersModule {}
