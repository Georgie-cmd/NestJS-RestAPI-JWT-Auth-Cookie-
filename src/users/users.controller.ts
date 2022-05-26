import { Body, Controller, Delete, Put, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { UsersService } from './users.service';
import { TokenService } from 'src/auth/token.service';
import { PasswordRecoverDto } from 'src/dto/recovering/update-pass-user.dto';
import { CurrentData } from 'src/dto/new-data/data-update.dto';


@Controller('users')
export class UsersController {
    constructor(
        private userService: UsersService,
        private tokenService: TokenService
    ) {}

    @Put('/password-recover')
    @UseGuards(AuthGuard('refresh'))
    async passRecover(
        @Body() passDto: PasswordRecoverDto,
        @Req() req, @Res({ passthrough: true }) res: Response
    ) {
        await this.userService.passRecover(passDto, req.user.email)
        
        res.statusCode = 200
        return {msg: 'success'}
    }


    @Put('/data-updating')
    @UseGuards(AuthGuard('refresh'))
    async dataUpdating(
        @Body() currData: CurrentData,
        @Req() req, @Res({ passthrough: true }) res: Response
    ) {
        await this.userService.dataUpdating(currData, req.user.id)

        res.statusCode = 200
        return {msg: 'success'}
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
