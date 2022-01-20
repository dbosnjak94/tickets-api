"use strict";

import { Request, Response, NextFunction } from "express";

import { AuthService } from "./services";
import { AuthRepository } from "../../database/repositories/auth.resporitory";
import { IAuthController, IAuthService, IAuthRepository } from "./interfaces";
import { UserDto } from "../../dto/user.dto";

const authRepository: IAuthRepository = new AuthRepository();

const authService: IAuthService = new AuthService(authRepository);

export class AuthController implements IAuthController {
  async signUp(req: Request, res: Response, next: NextFunction): Promise<{}> {
    try {
      let user: UserDto = await authService.signUp(req, res);
      return res.json(user);
    } catch (err) {
      return err.message;
    }
  }

  async signIn(req: Request, res: Response, next: NextFunction): Promise<{}> {
    try {
      let user: UserDto = await authService.signIn(req, res);
      return res.json(user);
    } catch (err) {
      return err.message;
    }
  }
}
