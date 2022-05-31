export class CreateUserDto {
    id: number
    first_name: string
    last_name: string
    company: string
    company_role: string
    email: string
    password: string
    refresh_token: string
    refresh_token_exp: string
    ip_address: string
}