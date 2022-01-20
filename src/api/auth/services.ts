import { Request, Response } from "express";

import { UserDto } from "../../dto/user.dto";
import { IAuthRepository, IAuthService } from "./interfaces";
import { hashPassword, comparePassword } from "../../utils/bcrypt.utils";
import { generateToken } from "../../utils/jwtGenerator.utils";
import { IUser } from "../../database/models/user.model";
import { StatusCodes } from "../../statusCodes/statusCodes";

export class AuthService implements IAuthService {
  constructor(private authRepository: IAuthRepository) {}

  async signUp(req: Request, res: Response): Promise<UserDto> {
    try {
      let { first_name, last_name, email, password } = req.body;
      password = await hashPassword(password);
      let user: IUser = await this.authRepository.getUserByEmail(email);

      if (user) {
        return {
          status: StatusCodes.CONFILCT,
          message: "User already exists",
        };
      }

      user = await this.authRepository.createUser({
        first_name,
        last_name,
        email,
        password,
      });

      const userInfo: IUser = await this.authRepository.getUserByEmail(email);

      delete userInfo.password;
      const jwt = generateToken(userInfo);

      if (!jwt) {
        return {
          status: StatusCodes.UNPROCESSABLE,
          message: jwt.message,
        };
      }

      return {
        status: StatusCodes.OK,
        data: userInfo,
        token: jwt.toString(),
        message: "New user has been created",
      };
    } catch (err) {
      return {
        status: StatusCodes.SERVER_ERROR,
        message: err.message,
      };
    }
  }

  async signIn(req: Request, res: Response): Promise<UserDto> {
    try {
      let { email, password } = req.body;

      const user: IUser = await this.authRepository.getUserByEmail(email);

      if (!user) {
        return {
          status: StatusCodes.UNPROCESSABLE,
          message: "Email does not exist, please try again",
        };
      }

      const token = generateToken(user);

      let match = await comparePassword(password, user.password);

      if (!match) {
        return {
          status: StatusCodes.FORBIDDEN,
          message: "Wrong password, please try again",
        };
      }

      return {
        status: StatusCodes.OK,
        data: user,
        token: token.toString(),
        message: "User is logged in",
      };
    } catch (err) {
      return {
        status: StatusCodes.SERVER_ERROR,
        message: err.message,
      };
    }
  }
}
