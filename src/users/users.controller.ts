import { Body, Controller, Delete, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { UsersService } from './users.service';
import { TokenService } from 'src/auth/token.service';

@Controller('users')
export class UsersController {
    constructor(
        private userService: UsersService,
        private tokenService: TokenService
    ) {}

    @Post('/password-recover')
    async passRecover() {

    }

    @Post('/email-recover')
    async emailRecover() {

    }

    @Post('/data-updating')
    async dataUpdating() {

    }

    @Delete('/account-deleting')
    @UseGuards(AuthGuard('refresh'))
    async deleteAccount(@Req() req, @Res({ passthrough: true }) res: Response) {
        await this.tokenService.removeRefreshToken(req.user.id)
        res.clearCookie('auth-cookie', null)
        await this.userService.deleteUser(req.user.email)
        return {msg: 'success'}
    }
}
