import { IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Match } from "src/decorators/match.decorator";


export class PasswordRecoverDto {
    @IsString()
    this_password: string

    @IsString()
    @MinLength(8, {message: 'Password must be at least 4 character...'})
    @MaxLength(36, {message: 'Password cannot be more than 36 characters...'})
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password must include: 1 Uppercase letter, more than 8 characters and one numeric character...'
    })
    new_password: string

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Match('new_password', {message: 'The confirmation password does not match the password entered...'})
    confirm_password: string
} 