export interface ITicket {
  id_ticket?: number;
  id_vendor: number;
  starting_point: string;
  end_point: string;
  time_of_departure: string;
  price: number;
  available_number_of_tickets: number;
}

export interface IUserTicket {
  id_ticket: number;
  id_user: number;
  id_purchase: number;
  seat_number: number;
}

export interface IPurchasedTicket {
  seat_number?: number;
  owner: string;
  starting_point: string;
  end_point: string;
  time_of_departure: string;
  price: number;
  available_number_of_tickets: number;
  datetime_of_purchase: string;
}
