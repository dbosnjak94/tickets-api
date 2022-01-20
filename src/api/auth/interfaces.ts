import { Request, Response, NextFunction } from 'express';
import { UserDto } from '../../dto/user.dto';
import { IUser } from '../../database/models/user.model';

export interface IAuthController {
    signUp(req: Request, res: Response, next: NextFunction): Promise<{}>;
    signIn(req: Request, res: Response, next: NextFunction): Promise<{}>;
}

export interface IAuthService {
    signUp(req: Request, res: Response): Promise<UserDto>;
    signIn(req: Request, res: Response): Promise<UserDto>;
}

export interface IAuthRepository {
    createUser(user: IUser);
    getUserByEmail(email: string): Promise<IUser | null>;
}