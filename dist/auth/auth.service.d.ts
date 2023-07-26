import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<any>;
    register(dto: CreateUserDto): Promise<CreateUserDto & import("../users/entities/user.entity").UserEntity>;
}
