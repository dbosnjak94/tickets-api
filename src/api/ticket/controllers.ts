'use strict'

import { Request, Response, NextFunction } from 'express'

import { TicketRepository } from '../../database/repositories/ticket.repository'
import { ITicketService, ITicketRepository, ITicketController } from './interfaces'
import { TicketService } from './services'

const ticketRepository: ITicketRepository = new TicketRepository()

const ticketService: ITicketService = new TicketService(ticketRepository)

export class TicketController implements ITicketController {
  async addTicket(req: Request, res: Response, next: NextFunction): Promise<{}> {
    try {
      let ticket = await ticketService.addTicket(req, res)
      return res.json(ticket)
    } catch (err) {
      return err.message
    }
  }

  async deleteTicket(req: Request, res: Response, next: NextFunction): Promise<{}> {
    try {
      let deletedTicket = await ticketService.deleteTicket(req, res)
      return res.json(deletedTicket)
    } catch (err) {
      return err.message
    }
  }

  async editTicket(req: Request, res: Response, next: NextFunction): Promise<{}> {
    try {
      let editedTicket = await ticketService.editTicket(req, res)
      return res.json(editedTicket)
    } catch (err) {
      return err.message
    }
  }

  async getListOfAllTickets(req: Request, res: Response, next: NextFunction): Promise<{}> {
    try {
      let listOfAllTickets = await ticketService.getListOfAllTickets(req, res)
      return res.json(listOfAllTickets)
    } catch (err) {
      return err.message
    }
  }
}
