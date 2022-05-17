import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDto } from 'src/dto/register-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { CurrentUser } from 'src/model/current-user';
import { JwtService } from '@nestjs/jwt';
import * as randomToken from 'rand-token'
import * as moment from 'moment'
import { Token } from 'src/database/token.model';
import { InjectModel } from '@nestjs/sequelize';


@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        @InjectModel(Token) private tokenRepository: typeof Token
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
            return await this.userService.createUser({...registerDto, password: hashedPassword})
        }
    } 


//tokens
    public async getJwtToken(currentUser: CurrentUser): Promise<string> {
        let paypoad = {
            id: currentUser.id,
            email: currentUser.email
        }
        return this.jwtService.signAsync(paypoad)
    }


    public async getRefreshToken(userId: number): Promise<any> {
        const userDataToUpdate = {
            refreshToken: randomToken.generate(20),
            refreshTokenExp: moment().day(1).format('YYYY/MM/DD')
        }

        await this.tokenRepository.update({
            refresh_token: userDataToUpdate.refreshToken,
            refresh_token_exp: userDataToUpdate.refreshTokenExp
        }, {where: {userId: userId}})
    
        // const tokenCreation = await this.tokenRepository.create({
        //         refresh_token: userDataToUpdate.refreshToken, 
        //         refresh_token_exp: userDataToUpdate.refreshTokenExp,
        //         userId: userId
        //     }
        // )

        // await this.tokenRepository.update({
        //     refresh_token: userDataToUpdate.refreshToken,
        //     refresh_token_exp: userDataToUpdate.refreshTokenExp
        // }, {where: {userId: userId}})

        return {...userDataToUpdate}
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
            throw new UnauthorizedException({message: 'Incorrect email or password...'}, err)
        }
    }

    public async validateRefreshToken(email: string, refreshToken: string): Promise<CurrentUser> {

        const currentDate = moment().format('YYYY/MM/DD')
        let user =  await this.userService.findByEmail(email)
        // let token = await this.tokenRepository.findOne({
        //     where: {
        //         refresh_token: refreshToken,
        //         refresh_token_exp: currentDate
        //     }
        // })
        if(user) {
            let currentUser = new CurrentUser()
            currentUser.id = user.id
            currentUser.first_name = user.first_name
            currentUser.company = user.first_name
            currentUser.company_role = user.company
            currentUser.email = user.email

            return currentUser
        }
    }

}
