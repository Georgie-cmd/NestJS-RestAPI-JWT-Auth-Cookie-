import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Match } from "src/decorators/match.decorator";


export class RegisterUserDto {
    id: number

    ip_address: string

    @IsString({message: 'First name must include only letters (a-zA-Z)...'})
    @MinLength(1, {message: 'First name must be at least 1 character...'})
    @MaxLength(13, {message: 'First name cannot be more than 13 characters...'})
    first_name: string

    @IsString({message: 'Last name must include only letters (a-zA-Z)...'})
    @MinLength(1, {message: 'Last name must be at least 1 character...'})
    @MaxLength(22, {message: 'Last name cannot be more than 22 characters...'})
    last_name: string

    @IsString({message: 'Company\'s name must include only letters (a-zA-Z)...'})
    @MinLength(4, {message: 'Company\'s name must be at least 4 character...'})
    @MaxLength(36, {message: 'Company\'s name cannot be more than 36 characters...'})
    company: string

    @IsString({message: 'Role\'s name must include only letters (a-zA-Z)...'})
    @MinLength(2, {message: 'Role\'s name must be at least 2 character...'})
    @MaxLength(52, {message: 'Role\'s name cannot be more than 13 characters...'})
    company_role: string

    @IsEmail()
    @IsString({message: 'Last name must include only letters (a-zA-Z)...'})
    email: string

    @IsString()
    @MinLength(8, {message: 'Password must be at least 8 characters...'})
    @MaxLength(36, {message: 'Password cannot be more than 36 characters...'})
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password must include: 1 Uppercase letter, more than 8 characters and one numeric character...'
    })
    password: string

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Match('password', {message: 'The confirmation password does not match the password entered...'})
    confirm_password: string
} 