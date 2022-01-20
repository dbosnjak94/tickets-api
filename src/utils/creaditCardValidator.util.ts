import { Request, Response, NextFunction } from "express";

export const creditCardValidatorUtil = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { credit_card_no } = req.body;

    if (credit_card_no.toString().length !== 16) {
      return res.send({
        message: "Card number not valid",
      });
    }
    return next();
  } catch (err) {
    err.statusCode = 500;
    return next(err.message);
  }
};
