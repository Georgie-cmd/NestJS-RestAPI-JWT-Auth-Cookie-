import { Controller } from "@nestjs/common";
import { EventPattern } from '@nestjs/microservices';
import { AppService } from "./app-service.service";
import { CreateUserEvent } from "./events/create-user.event";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @EventPattern('user_created')
    handleUserCreated(data: CreateUserEvent) {
        this.appService.handleUserCreated(data)
    }
}

