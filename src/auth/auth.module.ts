import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { LocalStrategyService } from './strategies/local-strategy/local-strategy.service';
import { JwtStrategyService } from './strategies/jwt-strategy/jwt-strategy.service';
import { User } from 'src/database/user.model';
import { RefreshStrategyService } from './strategies/refresh-strategy/refresh-strategy.service';
import { TokenService } from './token.service';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'development.env'
    }),
    SequelizeModule.forFeature([User]),
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: {
        expiresIn: process.env.TOKEN_EXPIRATION,
      }
    }),
    PassportModule
  ],
  providers: [
    AuthService, 
    TokenService, 
    LocalStrategyService, 
    JwtStrategyService, 
    RefreshStrategyService
  ],
  controllers: [AuthController],
  exports: [
    AuthService,
    TokenService,
    LocalStrategyService, 
    JwtStrategyService,
    RefreshStrategyService
  ]
})
export class AuthModule {}
