import { Injectable } from '@nestjs/common';
import { CreateUserEvent } from './events/create-user.event';

@Injectable()
export class AppService {
    handleUserCreated(data: CreateUserEvent) {
        console.log('ANALYTICS: new user has been created -', data)
        console.count('Users which just has been created')
    }
}
