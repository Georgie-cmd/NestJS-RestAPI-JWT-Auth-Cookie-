import { IsString, MaxLength, MinLength } from "class-validator";


export class CurrentData {
    @IsString({message: 'First name must include only letters (a-zA-Z)...'})
    @MinLength(1, {message: 'First name must be at least 1 character...'})
    @MaxLength(13, {message: 'First name cannot be more than 13 characters...'})
    first_name: string

    @IsString({message: 'Last name must be included only letters (a-zA-Z)...'})
    @MinLength(1, {message: 'Last name must be at least 1 character...'})
    @MaxLength(22, {message: 'Last name cannot be more than 22 characters...'})
    last_name: string

    @IsString({message: 'Company\'s name must include only letters (a-z, A-Z)...'})
    @MinLength(4, {message: 'Company\'s name must be at least 4 character...'})
    @MaxLength(36, {message: 'Company\'s name cannot be more than 36 characters...'})
    company: string

    @IsString({message: 'Role\'s name must include only letters (a-zA-Z)...'})
    @MinLength(2, {message: 'Role\'s name must be at least 2 character...'})
    @MaxLength(13, {message: 'Role\'s name cannot be more than 13 characters...'})
    company_role: string
} 