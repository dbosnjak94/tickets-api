import { Request, Response, NextFunction } from "express";

import { ListOfTicketsDto, TicketDto } from "../../dto/ticket.dto";
import {
  IPurchasedTicket,
  ITicket,
  IUserTicket,
} from "../../database/models/ticket.model";
import { ITicketInfo, IUser } from "../../database/models/user.model";
import { ListOfTicketInfosDto, PurchasedTicketDto } from "../../dto/user.dto";

export interface IUserController {
  getAllUserTickets(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<{}>;
  ticketPurchase(req: Request, res: Response, next: NextFunction): Promise<{}>;
  ticketCancel(req: Request, res: Response, next: NextFunction): Promise<{}>;
}

export interface IUserService {
  getAllUserTickets(req: Request, res: Response): Promise<ListOfTicketInfosDto>;
  ticketPurchase(req: Request, res: Response): Promise<PurchasedTicketDto>;
  ticketCancel(req: Request, res: Response): Promise<PurchasedTicketDto>;
}

export interface IUserRepository {
  getAllUserTickets(id_user): Promise<ITicketInfo[]>;
  ticketPurchase(userTicket: IUserTicket): Promise<IPurchasedTicket>;
  ticketCancel(id_purchase): Promise<boolean>;
  getUserByID(id_user): Promise<IUser>;
  getPurchasedTicketByPurchaseID(id_purchase): Promise<IPurchasedTicket>;
}
