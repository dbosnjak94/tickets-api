"use strict";

import express from "express";
import { IUserController } from "./interfaces";
import { UserController } from "./controllers";
import { authenticate } from "../../utils/jwtAuthentication.utils";
import { creditCardValidatorUtil } from "../../utils/creaditCardValidator.util";

const router = express.Router();

const userController: IUserController = new UserController();

router.get(
  "/getAllUserTickets",
  authenticate,
  userController.getAllUserTickets
);
router.post(
  "/ticketPurchase",
  authenticate,
  creditCardValidatorUtil,
  userController.ticketPurchase
);

export default router;
