import { Injectable } from '@nestjs/common';
import { User } from 'src/database/user.model';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import * as randomToken from 'rand-token'
import * as moment from 'moment'
import { Token } from 'src/database/token.model';


@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private userRepository: typeof User,
        @InjectModel(Token) private tokenRepository: typeof Token
    ) {}

    getSmth(): string {
        return 'Hello world!'
    }

//searching
    async findByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({where: {email}})
    }

    async findById(id: any): Promise<User> {
        return await this.userRepository.findOne({where: {id}})
    }

    async findByCompany(company: string): Promise<User> {
        return await this.userRepository.findOne({where: {company}})    
    }

//creating
    async createUser(userDto: CreateUserDto): Promise<CreateUserDto> {
        return await this.userRepository.create(userDto)
    }
}
