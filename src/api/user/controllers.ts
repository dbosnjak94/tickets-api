'use strict'

import { Request, Response, NextFunction } from 'express'
import { IUserController, IUserRepository, IUserService } from './interfaces'
import { UserRepository } from '../../database/repositories/user.repository'
import { UserService } from './services'
import { ITicketRepository } from '../ticket/interfaces'
import { TicketRepository } from '../../database/repositories/ticket.repository'

const userRepository: IUserRepository = new UserRepository()
const ticketRepository: ITicketRepository = new TicketRepository()

const userService: IUserService = new UserService(userRepository, ticketRepository)

export class UserController implements IUserController {
  async getAllUserTickets(req: Request, res: Response, next: NextFunction): Promise<{}> {
    try {
      let user = await userService.getAllUserTickets(req, res)
      return res.json(user)
    } catch (err) {
      return err.message
    }
  }

  async ticketPurchase(req: Request, res: Response, next: NextFunction): Promise<{}> {
    try {
      let purchasedTicket = await userService.ticketPurchase(req, res)
      return res.json(purchasedTicket)
    } catch (err) {
      return err.message
    }
  }

  async ticketCancel(req: Request, res: Response, next: NextFunction): Promise<{}> {
    try {
      let canceledTicket = await userService.ticketCancel(req, res)
      return res.json(canceledTicket)
    } catch (err) {
      return err.message
    }
  }
}
