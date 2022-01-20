export interface IUser {
  id_user?: number;
  email: string;
  password?: string;
  first_name: string;
  last_name: string;
}

export interface ITicketInfo {
  id_purchase: number;
  owner: string;
  starting_point: string;
  end_point: string;
  time_of_departure: string;
  time_of_arrival: string;
  price: number;
  available_number_of_tickets: number;
  datetime_of_purchase: string;
}
