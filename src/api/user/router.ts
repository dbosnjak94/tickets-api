"use strict";

import express from "express";
import { IUserController } from "./interfaces";
import { UserController } from "./controllers";
import { authenticate } from "../../utils/jwtAuthentication.utils";
import { creditCardValidatorUtil } from "../../utils/creditCardValidator.util";

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
router.delete("/ticketCancel", authenticate, userController.ticketCancel);

export default router;
