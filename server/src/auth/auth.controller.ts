import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { RegisterUserDto } from 'src/dto/req.body/register-user.dto';
import { CurrentUser } from 'src/dto/current-user';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { SkipThrottle, Throttle } from '@nestjs/throttler';


@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private tokenService: TokenService
    ) {}


    @Post('/registration')
    async registration(@Body() registerDto: RegisterUserDto) {
        return this.authService.registration(registerDto)
    }

    @Throttle(50, 5)
    @Post('/login')
    @UseGuards(AuthGuard('local'))
    async login(@Req() req, @Res({passthrough: true}) res: Response) {
        let token = await this.tokenService.getJwtToken((req.user as CurrentUser))
        let refresh_token = await this.tokenService.getRefreshToken(req.user.id)
        let secretData = {
            token,
            refresh_token: refresh_token
        }
        res.cookie('auth-cookie', secretData, {httpOnly: true}) //secure: true
        return secretData
    }

    @Throttle(50, 5)
    @Get('/authentication')
    @UseGuards(AuthGuard('jwt'))
    async auth(@Req() req) {
        return ['Hello', 'World!!']
    }

    @Throttle(50, 5)
    @Get('/refresh-token')
    @UseGuards(AuthGuard('refresh'))
    async refreshTokens(@Req() req, @Res({ passthrough: true }) res: Response) {
        const token = await this.tokenService.getJwtToken(req.user as CurrentUser)
        const refreshToken = await this.tokenService.getRefreshToken(req.user.id)
        const secretData = {
          token,
          refresh_token: refreshToken
        }
     
        res.cookie('auth-cookie', secretData, { httpOnly: true })
        return {msg:'success'}
    }

    @Post('/logout')
    @UseGuards(AuthGuard('refresh'))
    async tokenLogout(@Req() req, @Res({ passthrough: true }) res: Response) {
        await this.tokenService.removeRefreshToken(req.user.id)
        res.clearCookie('auth-cookie', null)
        return {msg:'success'}
    }
}