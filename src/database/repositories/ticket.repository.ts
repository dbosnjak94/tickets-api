import { connection } from "../index";
import { IPurchasedTicket, ITicket } from "../models/ticket.model";
import { ITicketRepository } from "../../api/ticket/interfaces";

export class TicketRepository implements ITicketRepository {
  async addTicket(ticket: ITicket): Promise<boolean> {
    const result: any[] = await connection.query(
      `INSERT INTO ticket (id_vendor, starting_point, end_point, time_of_departure, price, available_number_of_tickets, created_at)
                    VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP());`,
      [
        ticket.id_vendor,
        ticket.starting_point,
        ticket.end_point,
        ticket.time_of_departure,
        ticket.price,
        ticket.available_number_of_tickets,
      ]
    );

    return result[0].affectedRows === 0 ? false : true;
  }

  async deleteTicket(id_ticket): Promise<boolean> {
    const result: any[] = await connection.query(
      `DELETE FROM ticket WHERE id_ticket = ?;`,
      [id_ticket]
    );

    return result[0].affectedRows === 0 ? false : true;
  }

  async editTicket(ticket: ITicket): Promise<boolean> {
    const result: any[] = await connection.query(
      `UPDATE ticket
                    SET
                    id_vendor = ?,
                    starting_point = ?,
                    end_point = ?,
                    time_of_departure = ?,
                    price = ?,
                    available_number_of_tickets = ?,
                    updated_at = CURRENT_TIMESTAMP() 
                    WHERE id_ticket = ?;`,
      [
        ticket.id_vendor,
        ticket.starting_point,
        ticket.end_point,
        ticket.time_of_departure,
        ticket.price,
        ticket.available_number_of_tickets,
        ticket.id_ticket,
      ]
    );

    console.log(result[0].affectedRows);

    return result[0].affectedRows === 0 ? false : true;
  }

  async getListOfAllTickets(): Promise<ITicket[]> {
    const result: any[] = await connection.query(`SELECT * FROM ticket`);

    return result.length ? result[0] : null;
  }

  async getTicketByID(id_ticket): Promise<ITicket> {
    const result: any[] = await connection.query(
      `SELECT * FROM ticket WHERE id_ticket = ?`,
      id_ticket
    );

    return result.length ? result[0] : null;
  }

  async getAllPurchasedTickets(id_ticket): Promise<IPurchasedTicket[]> {
    const result: any[] = await connection.query(
      `SELECT * FROM user_ticket WHERE id_ticket = ?`,
      id_ticket
    );
    console.log(result[0]);
    return result[0];
  }

  // async getTicketByID(id_ticket): Promise<ITicket> {
  //   const result = await connection.query(
  //     `SELECT * FROM user WHERE id_ticket = ?;`,
  //     id_ticket
  //   );
  //   return result;
  // }
}
