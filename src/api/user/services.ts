import { Request, Response } from 'express'
import { IUserRepository, IUserService } from './interfaces'
import { StatusCodes } from '../../statusCodes/statusCodes'
import { ListOfTicketInfosDto, PurchasedTicketDto } from '../../dto/user.dto'
import { ITicketRepository } from '../ticket/interfaces'
import { timeValidatorUtil } from '../../utils/timeValidator.utils'

export class UserService implements IUserService {
  constructor(
    private userRepository: IUserRepository,
    private ticketRepository: ITicketRepository
  ) {}

  async getAllUserTickets(req: Request, res: Response): Promise<ListOfTicketInfosDto> {
    try {
      const id_user: number = req.body.user.id_user

      let listOfUserTickets = await this.userRepository.getAllUserTickets(id_user)
      return {
        status: StatusCodes.OK,
        data: listOfUserTickets,
        message: 'List of all user tickets',
      }
    } catch (err) {
      return {
        status: StatusCodes.SERVER_ERROR,
        message: err.message,
      }
    }
  }

  async ticketPurchase(req: Request, res: Response): Promise<PurchasedTicketDto> {
    try {
      const id_user: number = req.body.user.id_user
      let { id_ticket } = req.body
      let id_purchase = Math.round(Math.random() * 100000000)
      let seat_number = 0

      let ticket = await this.ticketRepository.getTicketByID(id_ticket)

      let getAllPurchasedTickets = await this.ticketRepository.getAllPurchasedTickets(id_ticket)

      if (getAllPurchasedTickets[0] === undefined) {
        seat_number = 1
      } else {
        seat_number = getAllPurchasedTickets[getAllPurchasedTickets.length - 1].seat_number + 1
      }

      if (ticket[0].available_number_of_tickets < seat_number) {
        return {
          status: StatusCodes.UNPROCESSABLE,
          message: `'There are no more available tickets for current flight'`,
        }
      }

      let purchasedTicket = await this.userRepository.ticketPurchase({
        id_ticket,
        id_user,
        id_purchase,
        seat_number,
      })

      return {
        status: StatusCodes.OK,
        data: purchasedTicket,
        message: `Ticket has been purchased`,
      }
    } catch (err) {
      return {
        status: StatusCodes.SERVER_ERROR,
        message: err.message,
      }
    }
  }

  async ticketCancel(req: Request, res: Response): Promise<PurchasedTicketDto> {
    try {
      let { id_purchase } = req.body
      console.log(id_purchase)

      let purchasedTicket = await this.userRepository.getPurchasedTicketByPurchaseID(id_purchase)

      let cancellation_time_approval = await timeValidatorUtil(purchasedTicket[0].time_of_departure)

      if (cancellation_time_approval === false) {
        return {
          status: StatusCodes.FORBIDDEN,
          message: `Ticket number ${id_purchase} cannot be canceled becuase there is less than one hour before departure`,
        }
      }

      let canceledTicket = await this.userRepository.ticketCancel(id_purchase)

      if (canceledTicket === false) {
        return {
          status: StatusCodes.UNPROCESSABLE,
          message: `Ticket number ${id_purchase} cannot be canceled. Contact our support team.`,
        }
      }

      return {
        status: StatusCodes.OK,
        message: `Ticket No. ${id_purchase} has been canceled`,
      }
    } catch (err) {
      return {
        status: StatusCodes.SERVER_ERROR,
        message: err.message,
      }
    }
  }
}
