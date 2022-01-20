import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUserRepository } from "../api/user/interfaces";
import { UserRepository } from "../database/repositories/user.repository";

interface TokenData {
  id_user: number;
}

interface TokenInput {
  data: TokenData;
}

const userRepository: IUserRepository = new UserRepository();

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string = req.headers.jwt as string;
  if (!token) {
    return res.send({
      message: "Invalid or no token provided.",
    });
  }
  try {
    jwt.verify(
      token,
      "SecretKey",
      async (err: Error, decodedToken: TokenInput) => {
        if (err) {
          res.send({
            message: "Invalid Token.",
          });
        } else {
          let user = await userRepository.getUserByID(
            decodedToken.data.id_user
          );
          if (!user) {
            return res.send({
              message: "No User with provided token!",
            });
          }
          req.body.user = decodedToken.data;
          return next();
        }
      }
    );
  } catch (err) {
    err.statusCode = 500;
    return next(err);
  }
};
