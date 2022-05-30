import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { RegisterUserDto } from 'src/dto/req.body/register-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { CurrentUser } from 'src/dto/current-user';
import * as randomToken from 'rand-token';
import * as moment from 'moment';
import * as ipify from 'ipify2';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserEvent } from 'src/events/create-user.event';


@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        @Inject('ANALYTICS') private readonly analyticsClient: ClientProxy
    ) {}

//register
    async registration(registerDto: RegisterUserDto): Promise<any> {        
        const candidate = await this.userService.findByEmail(registerDto.email)
        if(candidate) {
            throw new HttpException('This user is already exists...', HttpStatus.BAD_REQUEST)
        }

        if(registerDto.password !== registerDto.confirm_password) {
            throw new HttpException('Passwords are not the same..', HttpStatus.BAD_REQUEST)
        } else {
            const hashedPassword = await bcrypt.hash(registerDto.password, 13)
            const ip = await ipify.ipv4()
            const userTokens = {
                refresh_token: randomToken.generate(20),
                refresh_token_exp: moment().day(1).format('YYYY/MM/DD')
            }

    //publish to analytics
            this.analyticsClient.emit(
                'user_created',
                new CreateUserEvent(registerDto.email)
            )

            return await this.userService.createUser({
                ...registerDto, 
                password: hashedPassword, 
                refresh_token: userTokens.refresh_token,
                refresh_token_exp: userTokens.refresh_token_exp,
                ip_address: ip
            })
        }
    } 


//sending to 'analytics' microservice
    getAnalytics() {
        return this.analyticsClient.send({ cmd: 'get_analytics' }, {});
    }


//validation
    async usersValidation(email: string, password: string): Promise<CurrentUser> {
        const user = await this.userService.findByEmail(email)  
        if(!user) {
            throw new HttpException('Incorrect email or password...', HttpStatus.NOT_FOUND)
        }

        const passwordEquals = await bcrypt.compare(password, user.password)
        if(!passwordEquals) {
            throw new HttpException('Incorrect email or password...', HttpStatus.NOT_FOUND)
        }

        let currentUser = new CurrentUser()
        currentUser.id = user.id
        currentUser.first_name = user.first_name
        currentUser.company = user.first_name
        currentUser.company_role = user.company
        currentUser.email = user.email

        return currentUser
    }
}