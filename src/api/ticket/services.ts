import { Request, Response } from 'express'
import { ITicketRepository, ITicketService } from './interfaces'
import { ListOfTicketsDto, TicketDto } from '../../dto/ticket.dto'
import { StatusCodes } from '../../statusCodes/statusCodes'

export class TicketService implements ITicketService {
  constructor(private ticketRepository: ITicketRepository) {}

  async addTicket(req: Request, res: Response): Promise<TicketDto> {
    try {
      let {
        id_vendor,
        starting_point,
        end_point,
        time_of_departure,
        time_of_arrival,
        price,
        available_number_of_tickets,
      } = req.body

      let ticket = await this.ticketRepository.addTicket({
        id_vendor,
        starting_point,
        end_point,
        time_of_departure,
        time_of_arrival,
        price,
        available_number_of_tickets,
      })

      if (ticket === false) {
        return {
          status: StatusCodes.UNPROCESSABLE,
          message: 'Ticket cannot be added to the database',
        }
      }
      return {
        status: StatusCodes.OK,
        message: 'New ticket has been created.',
      }
    } catch (err) {
      return {
        status: StatusCodes.SERVER_ERROR,
        message: err.message,
      }
    }
  }

  async deleteTicket(req: Request, res: Response): Promise<TicketDto> {
    try {
      let { id_ticket } = req.body

      let deletedTicket = await this.ticketRepository.deleteTicket(id_ticket)

      if (deletedTicket === false) {
        return {
          status: StatusCodes.UNPROCESSABLE,
          message: 'Ticket cannot be deleted',
        }
      }
      return {
        status: StatusCodes.OK,
        message: 'Ticket has been deleted',
      }
    } catch (err) {
      return {
        status: StatusCodes.SERVER_ERROR,
        message: err.message,
      }
    }
  }

  async editTicket(req: Request, res: Response): Promise<TicketDto> {
    try {
      let {
        id_vendor,
        starting_point,
        end_point,
        time_of_departure,
        time_of_arrival,
        price,
        available_number_of_tickets,
        id_ticket,
      } = req.body

      let ticket = await this.ticketRepository.editTicket({
        id_vendor,
        starting_point,
        end_point,
        time_of_departure,
        time_of_arrival,
        price,
        available_number_of_tickets,
        id_ticket,
      })

      if (ticket === false) {
        return {
          status: StatusCodes.UNPROCESSABLE,
          message: 'Ticket info cannot be edited.',
        }
      }
      return {
        status: StatusCodes.OK,
        message: 'Ticket info has been edited.',
      }
    } catch (err) {
      return {
        status: StatusCodes.SERVER_ERROR,
        message: err.message,
      }
    }
  }

  async getListOfAllTickets(req: Request, res: Response): Promise<ListOfTicketsDto> {
    try {
      let listOfTickets = await this.ticketRepository.getListOfAllTickets()
      return {
        status: StatusCodes.OK,
        data: listOfTickets,
        message: 'List of all available tickets',
      }
    } catch (err) {
      return {
        status: StatusCodes.SERVER_ERROR,
        message: err.message,
      }
    }
  }
}
