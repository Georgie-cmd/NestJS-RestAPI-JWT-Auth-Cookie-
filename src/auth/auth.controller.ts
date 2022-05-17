import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { RegisterUserDto } from 'src/dto/register-user.dto';
import { CurrentUser } from 'src/model/current-user';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/registration')
    async registration(@Body() registerDto: RegisterUserDto) {
        return this.authService.registration(registerDto)
    }

    @Post('/login')
    @UseGuards(AuthGuard('local'))
    async login(@Req() req, @Res({passthrough: true}) res: Response) {
        let token = await this.authService.getJwtToken((req.user as CurrentUser))
        let refresh_token = await this.authService.getRefreshToken(req.user.id)
        let secretData = {
            token,
            refresh_token: refresh_token
        }
        res.cookie('auth-cookie', secretData, {httpOnly: true}) //secure: true
        return secretData
    }

    @Get('/authentication')
    @UseGuards(AuthGuard('jwt'))
    async auth(@Req() req) {
        return ['Hello', 'World!!']
    }

    @Get('/refresh-token')
    @UseGuards(AuthGuard('refresh'))
    async refreshTokens(@Req() req, @Res({ passthrough: true }) res: Response) {
        const token = await this.authService.getJwtToken(req.user as CurrentUser)
        const refreshToken = await this.authService.getRefreshToken(req.user.id)
        const secretData = {
          token,
          refresh_token: refreshToken
        }
     
        res.cookie('auth-cookie', secretData, { httpOnly: true })
        return {msg:'success'}
    }
}
