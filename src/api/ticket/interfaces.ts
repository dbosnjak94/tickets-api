import { Request, Response, NextFunction } from 'express'

import { ListOfTicketsDto, TicketDto } from '../../dto/ticket.dto'
import { IPurchasedTicket, ITicket } from '../../database/models/ticket.model'

export interface ITicketController {
  getListOfAllTickets(req: Request, res: Response, next: NextFunction): Promise<{}>
  addTicket(req: Request, res: Response, next: NextFunction): Promise<{}>
  editTicket(req: Request, res: Response, next: NextFunction): Promise<{}>
  deleteTicket(req: Request, res: Response, next: NextFunction): Promise<{}>
}

export interface ITicketService {
  getListOfAllTickets(req: Request, res: Response): Promise<ListOfTicketsDto>
  // getTicketByID(req: Request, res: Response): Promise<ITicket>;
  addTicket(req: Request, res: Response): Promise<TicketDto>
  editTicket(req: Request, res: Response): Promise<TicketDto>
  deleteTicket(req: Request, res: Response): Promise<TicketDto>
}

export interface ITicketRepository {
  getListOfAllTickets(): Promise<ITicket[]>
  getTicketByID(id_ticket): Promise<ITicket>
  addTicket(ticket: ITicket): Promise<boolean>
  editTicket(ticket: ITicket): Promise<boolean>
  deleteTicket(id_ticket): Promise<boolean>
  getAllPurchasedTickets(id_ticket): Promise<IPurchasedTicket[]>
}
