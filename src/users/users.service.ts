import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from 'src/database/user.model';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt'
import { PasswordRecoverDto } from 'src/dto/recovering/update-pass-user.dto';


@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User) {}

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


//deleting
    async deleteUser(email: string): Promise<any> {
        return await this.userRepository.destroy({where: {email: email}})
    }


//password's recover
    async passRecover(passDto: PasswordRecoverDto, email: string): Promise<any> {
        const user = await this.userRepository.findOne({where: {email: email}})

        const passwordEquals = await bcrypt.compare(passDto.this_password, user.password)
        if(!passwordEquals) {
            throw new HttpException('Incorrect password...', HttpStatus.BAD_REQUEST)
        }

        if(passDto.new_password === passDto.confirm_password) {
            const hashedPassword = await bcrypt.hash(passDto.new_password, 13)
            return await this.userRepository.update({password: hashedPassword}, {where: {email: email}})
        } else {
            throw new HttpException('Passwords are not the same..', HttpStatus.BAD_REQUEST)
        }
    }
}
