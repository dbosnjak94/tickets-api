import { Request, Response } from "express";
import { IUserRepository, IUserService } from "./interfaces";
import { ListOfTicketsDto, TicketDto } from "../../dto/ticket.dto";
import { StatusCodes } from "../../statusCodes/statusCodes";
import { ListOfTicketInfosDto, PurchasedTicketDto } from "../../dto/user.dto";
import { ITicketRepository } from "../ticket/interfaces";
import { IPurchasedTicket } from "../../database/models/ticket.model";

export class UserService implements IUserService {
  constructor(
    private userRepository: IUserRepository,
    private ticketRepository: ITicketRepository
  ) {}

  async getAllUserTickets(
    req: Request,
    res: Response
  ): Promise<ListOfTicketInfosDto> {
    try {
      const id_user: number = req.body.user.id_user;

      let listOfUserTickets = await this.userRepository.getAllUserTickets(
        id_user
      );
      return {
        status: StatusCodes.OK,
        data: listOfUserTickets,
        message: "List of all user tickets",
      };
    } catch (err) {
      return {
        status: StatusCodes.SERVER_ERROR,
        message: err.message,
      };
    }
  }

  async ticketPurchase(
    req: Request,
    res: Response
  ): Promise<PurchasedTicketDto> {
    try {
      const id_user: number = req.body.user.id_user;
      let { id_ticket } = req.body;

      let ticket = await this.ticketRepository.getTicketByID(id_ticket);

      let getAllPurchasedTickets =
        await this.ticketRepository.getAllPurchasedTickets(id_ticket);

      let id_purchase = Math.round(Math.random() * 100000000);

      let seat_number =
        getAllPurchasedTickets[getAllPurchasedTickets.length - 1].seat_number +
        1;

      let purchasedTicket = await this.userRepository.ticketPurchase({
        id_ticket,
        id_user,
        id_purchase,
        seat_number,
      });

      console.log(purchasedTicket);

      return {
        status: StatusCodes.OK,
        data: purchasedTicket,
        message: `Ticket has been purchased`,
      };
    } catch (err) {
      return {
        status: StatusCodes.SERVER_ERROR,
        message: err.message,
      };
    }
  }
}
