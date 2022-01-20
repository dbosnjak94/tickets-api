import { connection } from "../index";
import { ITicketInfo, IUser } from "../models/user.model";
import { IUserRepository } from "../../api/user/interfaces";
import { IPurchasedTicket, ITicket } from "../models/ticket.model";

export class UserRepository implements IUserRepository {
  async getAllUserTickets(id_user): Promise<ITicketInfo[]> {
    const result: any[] = await connection.query(
      `SELECT 
            id_purchase,
            concat(first_name," ", last_name) as owner, 
            starting_point, 
            end_point,
            time_of_departure,
            price,
            available_number_of_tickets,
            datetime_of_purchase
              FROM user_ticket
              INNER JOIN user ON user_ticket.id_user=user.id_user
              INNER JOIN ticket ON user_ticket.id_ticket=ticket.id_ticket
              WHERE user_ticket.id_user = ?;`,
      id_user
    );

    return result.length ? result[0] : false;
  }

  async getUserByID(id_user): Promise<IUser> {
    const result: any[] = await connection.query(
      `SELECT * FROM user WHERE id_user = ?`,
      id_user
    );

    return result.length ? result[0] : false;
  }

  async ticketPurchase(purchasedTicket): Promise<IPurchasedTicket> {
    await connection.query(
      `INSERT INTO user_ticket (id_ticket, id_user, id_purchase, seat_number, datetime_of_purchase, created_at )
                VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());`,
      [
        purchasedTicket.id_ticket,
        purchasedTicket.id_user,
        purchasedTicket.id_purchase,
        purchasedTicket.seat_number,
      ]
    );

    const result: any[] = await connection.query(
      `SELECT 
            concat(first_name," ", last_name) as owner, 
            starting_point, 
            end_point,
            time_of_departure,
            price,
            available_number_of_tickets,
            datetime_of_purchase
              FROM user_ticket
              INNER JOIN user ON user_ticket.id_user=user.id_user
              INNER JOIN ticket ON user_ticket.id_ticket=ticket.id_ticket
              WHERE user_ticket.id_purchase = ?;`,
      purchasedTicket.id_purchase
    );

    return result[0];
  }

  async ticketCancel(id_purchase): Promise<boolean> {
    const result: any[] = await connection.query(
      `DELETE FROM user_ticket WHERE id_purchase = ?;`,
      id_purchase
    );

    return result[0].affectedRows === 0 ? false : true;
  }

  async getPurchasedTicketByPurchaseID(id_purchase): Promise<IPurchasedTicket> {
    const result: any[] = await connection.query(
      `SELECT 
            concat(first_name," ", last_name) as owner, 
            starting_point, 
            end_point,
            time_of_departure,
            time_of_arrival,
            price,
            available_number_of_tickets,
            datetime_of_purchase
              FROM user_ticket
              INNER JOIN user ON user_ticket.id_user=user.id_user
              INNER JOIN ticket ON user_ticket.id_ticket=ticket.id_ticket
              WHERE user_ticket.id_purchase = ?;`,
      id_purchase
    );

    return result[0];
  }
}
