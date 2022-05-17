import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class RefreshStrategyService extends PassportStrategy(Strategy, 'refresh') {
    constructor(private authService: AuthService){
        super({
            ignoreExpiration: true,
            passReqToCallback:true,
            secretOrKey: process.env.SECRET_KEY,
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    let data = request?.cookies["auth-cookie"]
                    if(!data){
                        return null
                    }
                return data.token
                }
            ])
        })
    }

    async validate(req: Request, payload:any){
        if(!payload){
            throw new BadRequestException('invalid jwt token');
        }
        
        let data = req?.cookies['auth-cookie'];
        if(!data?.refresh_token){
            throw new BadRequestException('invalid refresh token');
        }
        let user = await this.authService.validateRefreshToken(payload.email, data.refresh_token);
        if(!user){
            throw new BadRequestException('token expired');
        }

        return user
    }
}