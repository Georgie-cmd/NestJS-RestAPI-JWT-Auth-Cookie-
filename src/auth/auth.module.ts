import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Token } from 'src/database/token.model';
import { LocalStrategyService } from './strategies/local-strategy/local-strategy.service';
import { JwtStrategyService } from './strategies/jwt-strategy/jwt-strategy.service';
import { User } from 'src/database/user.model';
import { RefreshStrategyService } from './strategies/refresh-strategy/refresh-strategy.service';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'development.env'
    }),
    SequelizeModule.forFeature([Token, User]),
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: {
        expiresIn: 30,
      }
    }),
    PassportModule
  ],
  providers: [AuthService, LocalStrategyService, JwtStrategyService, RefreshStrategyService],
  controllers: [AuthController],
  exports: [
    AuthService,
    LocalStrategyService, 
    JwtStrategyService,
    RefreshStrategyService
  ]
})
export class AuthModule {}
