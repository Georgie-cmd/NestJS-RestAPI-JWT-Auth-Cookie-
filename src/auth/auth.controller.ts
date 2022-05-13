import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { RegisterUserDto } from 'src/dto/register-user.dto';
import { CurrentUser } from 'src/model/current-user';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/registration')
    registration(@Body() registerUser: RegisterUserDto): any {
        return this.authService.registration(registerUser)
    }

    @Post('/login')
    @UseGuards(AuthGuard('local'))
    async login(@Req() req, @Res({passthrough: true}) res: Response) {
        let token = await this.authService.getJwtToken((req.user as CurrentUser))
        let secretData = {
            token,
            refresh_token: ''
        }
        res.cookie('auth-cookie', secretData, {httpOnly: true}) //secure: true
        return { msg: 'success' }
    }

    @Get('/authentication')
    @UseGuards(AuthGuard('jwt'))
    async auth(@Req() req) {
        return ['Hello', 'World!!']
    }
}
