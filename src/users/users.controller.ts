import { Body, Controller, Delete, Put, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { UsersService } from './users.service';
import { TokenService } from 'src/auth/token.service';
import { PasswordRecoverDto } from 'src/dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(
        private userService: UsersService,
        private tokenService: TokenService
    ) {}

    @Put('/password-recover')
    @UseGuards(AuthGuard('refresh'))
    async passRecover(@Body() passDto: PasswordRecoverDto) {
        await this.userService.passRecover(passDto)
        
        return {msg: 'success'}
    }

    @Put('/email-recover')
    async emailRecover() {

    }

    @Put('/data-updating')
    async dataUpdating() {

    }

    @Delete('/account-deleting')
    @UseGuards(AuthGuard('refresh'))
    async deleteAccount(@Req() req, @Res({ passthrough: true }) res: Response) {
        await this.tokenService.removeRefreshToken(req.user.id)
        await this.userService.deleteUser(req.user.email)

        res.clearCookie('auth-cookie', null)
        return {msg: 'success'}
    }
}
