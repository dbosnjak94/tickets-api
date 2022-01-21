import { ITicketInfo, IUser } from '../database/models/user.model'
import { IPurchasedTicket } from '../database/models/ticket.model'

export class UserDto {
  data?: IUser
  token?: string
  message?: string
  status: number
}

export class ListOfTicketInfosDto {
  data?: ITicketInfo[]
  message?: string
  status: number
}

export class PurchasedTicketDto {
  data?: IPurchasedTicket
  message?: string
  status: number
}
