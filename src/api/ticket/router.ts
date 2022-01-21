'use strict'

import express from 'express'
import { ITicketController } from './interfaces'
import { TicketController } from './controllers'

const router = express.Router()

const ticketController: ITicketController = new TicketController()

router.get('/getListOfAllTickets', ticketController.getListOfAllTickets)
router.post('/addTicket', ticketController.addTicket)
router.put('/editTicket', ticketController.editTicket)
router.delete('/deleteTicket', ticketController.deleteTicket)

export default router
