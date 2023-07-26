import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(signInDto: Record<string, any>): Promise<any>;
    register(dto: CreateUserDto): Promise<CreateUserDto & import("../users/entities/user.entity").UserEntity>;
}
