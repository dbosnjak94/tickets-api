import { ITicket } from "../database/models/ticket.model";

export class TicketDto {
  data?: ITicket;
  message?: string;
  status: number;
}

export class ListOfTicketsDto {
  data?: ITicket[];
  message?: string;
  status: number;
}
