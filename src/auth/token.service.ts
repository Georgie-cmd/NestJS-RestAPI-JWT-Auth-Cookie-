import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "src/database/user.model";
import { CurrentUser } from "src/dto/current-user";
import * as randomToken from 'rand-token';
import * as moment from 'moment';
import { UsersService } from "src/users/users.service";
import * as ipify from 'ipify2';


@Injectable()
export class TokenService {
    constructor(
        private jwtService: JwtService,
        private usersService: UsersService,
        @InjectModel (User) private userRepository: typeof User
    ) {}


//tokens
    public async getJwtToken(currentUser: CurrentUser): Promise<string> {
        let paypoad = {
            id: currentUser.id,
            email: currentUser.email
        }
        return this.jwtService.signAsync(paypoad)
    }

    public async getRefreshToken(id: number): Promise<string> {
        const ip = await ipify.ipv4()
        const userDataToUpdate = {
            refresh_token: randomToken.generate(20),
            refresh_token_exp: moment().day(62).format('YYYY/MM/DD')
        }

        await this.userRepository.update({
            refresh_token: userDataToUpdate.refresh_token,
            refresh_token_exp: userDataToUpdate.refresh_token_exp,
            ip_address: ip
        }, {where: {id: id}})

        return userDataToUpdate.refresh_token
    }


//remove token
    async removeRefreshToken(id: string) {
        const user = await this.usersService.findById(id)
        if (!user) {
            throw new HttpException('User with this id doesn\'t exist', HttpStatus.NOT_FOUND)
        }

        return this.userRepository.update({
            refresh_token: null
        }, {
            where: {
                id: id
            }
        })
    }


//validation
    public async validateRefreshToken(email: string, refresh_token: string): Promise<CurrentUser> {
        const currentDate = moment().day(62).format('YYYY/MM/DD')
        let user = await this.userRepository.findOne({
            where: {
                email: email, 
                refresh_token: refresh_token, 
                refresh_token_exp: currentDate
            }
        })
        if (!user) {
            return null;
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