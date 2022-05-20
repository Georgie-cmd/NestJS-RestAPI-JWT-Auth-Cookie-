import { Injectable, HttpException, HttpStatus, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { RegisterUserDto } from 'src/dto/register-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { CurrentUser } from 'src/model/current-user';
import * as randomToken from 'rand-token'
import * as moment from 'moment'
import { TokenService } from './token.service';


@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private tokenService: TokenService
    ) {}

//register
    async registration(registerDto: RegisterUserDto): Promise<any> {        
        try {
            const candidate = await this.userService.findByEmail(registerDto.email)
            if(candidate) {
                throw new HttpException('This user is already exists...', HttpStatus.BAD_REQUEST)
            }

            if(registerDto.password !== registerDto.confirm_password) {
                throw new HttpException('Passwords are not the same..', HttpStatus.BAD_REQUEST)
            } else {
                const hashedPassword = await bcrypt.hash(registerDto.password, 13)
                const userTokens = {
                    refresh_token: randomToken.generate(20),
                    refresh_token_exp: moment().day(1).format('YYYY/MM/DD')
                }

                return await this.userService.createUser({
                    ...registerDto, 
                    password: hashedPassword, 
                    refresh_token: userTokens.refresh_token,
                    refresh_token_exp: userTokens.refresh_token_exp
                })
            }
        } catch(err) {
            throw new BadRequestException({message: 'Something went wrong, try again later...', err})
        }
    } 


//validation
    async usersValidation(email: string, password: string): Promise<CurrentUser> {
        try {
            const user = await this.userService.findByEmail(email)
            const passwordEquals = await bcrypt.compare(password, user.password)
            if(user && passwordEquals) {
                let currentUser = new CurrentUser()
                currentUser.id = user.id
                currentUser.first_name = user.first_name
                currentUser.company = user.first_name
                currentUser.company_role = user.company
                currentUser.email = user.email
        
                return currentUser
            } else {
                throw new UnauthorizedException({message: 'Incorrect email or password...'})
            }
        } catch(err) {
            throw new BadRequestException({message: 'Something went wrong, try again later...', err})
        }
    }
}
