import { Body, Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Get('/hello')
    getSmth(): string {
        return this.userService.getSmth()
    }
    
    @Get('/get-user-by-id/:id')
    getOneById(@Body() id: number): any {
        return this.userService.findById(id)
    }

    @Get('/get-user-by-id/:email')
    getOneByEmail(@Body() email: string): any {
        return this.userService.findByEmail(email)
    }

    @Get('/get-user-by-id/:company')
    getOneByCompany(@Body() company: string): any {
        return this.userService.findByEmail(company)
    }
}
