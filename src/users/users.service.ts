import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from 'src/database/user.model';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt'
import { PasswordRecoverDto } from 'src/dto/recovering/update-pass-user.dto';
import { EmailUpdate } from 'src/dto/recovering/update-email.user.dto';


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
        await this.userRepository.findOne({where: {email: email}})

        if(passDto.password === passDto.confirm_password) {
            const hashedPassword = await bcrypt.hash(passDto.password, 13)
            return await this.userRepository.update({password: hashedPassword}, {where: {email: email}})
        } else {
            throw new HttpException('Passwords are not the same..', HttpStatus.BAD_REQUEST)
        }
    }


//email's recover
    async emailRecover(emailDto: EmailUpdate, id: number): Promise<any> {
        await this.userRepository.findOne({where: {id: id}})

        
    }
}
