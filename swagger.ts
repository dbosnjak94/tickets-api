const paths = {
  "/auth/signUp": {
    post: {
      summary: "New author registration",
      tags: ["Auth"],
      parameters: [
        {
          name: "Author sign up",
          in: "body",
          description: "User sign up model",
          required: true,
          schema: {
            $ref: "#/definitions/signUp",
          },
        },
      ],
      responses: {
        "200": {
          description: "User Registered and Auth Token granted",
          schema: {
            $ref: "#/responses/signUp",
          },
        },
      },
      produces: ["application/json"],
    },
  },
  "/auth/signIn": {
    post: {
      summary: "Email and password based login",
      tags: ["Auth"],
      parameters: [
        {
          name: "User login",
          in: "body",
          description: "User sign in model",
          required: true,
          schema: {
            $ref: "#/definitions/signIn",
          },
        },
      ],
      responses: {
        "200": {
          description: "Auth Token granted",
          schema: {
            $ref: "#/responses/signIn",
          },
        },
      },
      produces: ["application/json"],
    },
  },
  "/ticket/addTicket": {
    post: {
      summary: "Adding new ticket to the database",
      tags: ["Ticket"],
      parameters: [
        {
          name: "ticket",
          in: "body",
          description: "Ticket model",
          required: true,
          schema: {
            $ref: "#/definitions/addTicket",
          },
        },
      ],
      responses: {
        "200": {
          description: "Adding ticket to the database",
          schema: {
            $ref: "#/responses/addTicket",
          },
        },
      },
      produces: ["application/json"],
    },
  },
  "/ticket/deleteTicket": {
    delete: {
      summary: "Remove the ticket from the database",
      tags: ["Ticket"],
      parameters: [
        {
          name: "id_ticket",
          in: "body",
          description: "ticket ID",
          required: true,
          schema: {
            $ref: "#/definitions/deleteTicket",
          },
        },
      ],
      responses: {
        "200": {
          description: "Ticket has been deleted",
          schema: {
            $ref: "#/responses/deleteTicket",
          },
        },
      },
      produces: ["application/json"],
    },
  },
  "/ticket/editTicket": {
    put: {
      summary: "Edit ticket info",
      tags: ["Ticket"],
      parameters: [
        {
          name: "ticket_body",
          in: "body",
          description: "Ticket edit model",
          required: true,
          schema: {
            $ref: "#/definitions/editTicket",
          },
        },
      ],
      responses: {
        "200": {
          description: "Ticket has been edited",
          schema: {
            $ref: "#/responses/editTicket",
          },
        },
      },
      produces: ["application/json"],
    },
  },
  "/ticket/getListOfAllTickets": {
    get: {
      summary: "Get list of all tickets",
      tags: ["Ticket"],
      responses: {
        "200": {
          description: "List of all available tickets",
          schema: {
            $ref: "#/responses/getAllTickets",
          },
        },
      },
      produces: ["application/json"],
    },
  },
  "/user/getAllUserTickets": {
    get: {
      summary: "Get list of all tickets of a particular user",
      tags: ["User"],
      parameters: [
        {
          name: "jwt",
          in: "header",
          description: "JWT",
          required: true,
          type: "string",
        },
      ],
      responses: {
        "200": {
          description: "List of all available tickets",
          schema: {
            $ref: "#/responses/getAllUserTickets",
          },
        },
      },
      produces: ["application/json"],
    },
  },
  "/user/ticketPurchase": {
    post: {
      summary: "Adding new ticket to the database",
      tags: ["User"],
      parameters: [
        {
          name: "jwt",
          in: "header",
          description: "JWT",
          required: true,
          type: "string",
        },
        {
          name: "ticket purchase model",
          in: "body",
          description: "Ticket model",
          required: true,
          schema: {
            $ref: "#/definitions/ticketPurchase",
          },
        },
      ],
      responses: {
        "200": {
          description: "Adding ticket to the database",
          schema: {
            $ref: "#/responses/ticketPurchase",
          },
        },
      },
      produces: ["application/json"],
    },
  },
  "/user/ticketCancel": {
    delete: {
      summary: "Remove bought ticket from the database",
      tags: ["User"],
      parameters: [
        {
          name: "jwt",
          in: "header",
          description: "JWT",
          required: true,
          type: "string",
        },
        {
          name: "id_ticket",
          in: "body",
          description: "ticket ID",
          required: true,
          schema: {
            $ref: "#/definitions/ticketCancel",
          },
        },
      ],
      responses: {
        "200": {
          description: "Ticket has been deleted",
          schema: {
            $ref: "#/responses/ticketCancel",
          },
        },
      },
      produces: ["application/json"],
    },
  },
};

const definitions = {
  signUp: {
    example: {
      first_name: "Dominik",
      last_name: "Bosnjak",
      email: "dominik.bosnjak94@gmail.com",
      password: "Password1",
    },
  },
  signIn: {
    example: {
      email: "dominik.bosnjak94@gmail.com",
      password: "Password1",
    },
  },
  addTicket: {
    example: {
      id_vendor: 1,
      starting_point: "Zagreb",
      end_point: "Berlin",
      time_of_departure: "2022-01-31 16:30:00",
      time_of_arrival: "2022-01-31 16:30:00",
      price: 200.0,
      available_number_of_tickets: 100,
    },
  },
  deleteTicket: {
    example: {
      id_ticket: 1,
    },
  },
  editTicket: {
    example: {
      id_ticket: 1,
      id_vendor: 1,
      starting_point: "Zagreb",
      end_point: "Berlin",
      time_of_departure: "2022-01-31 16:30:00",
      time_of_arrival: "2022-01-31 16:30:00",
      price: 200.0,
      available_number_of_tickets: 100,
    },
  },
  ticketPurchase: {
    example: {
      id_ticket: 7,
      credit_card_no: 1111111111111111,
    },
  },
  ticketCancel: {
    example: {
      id_purchase: 28801477,
    },
  },
};

const responses = {};

const port = process.env.PORT || 3000;
const ip = process.env.IP || "localhost";

export function generateDocumentation() {
  return {
    _swagger: "2.0",
    get swagger() {
      return this["_swagger"];
    },
    set swagger(value) {
      this["_swagger"] = value;
    },
    schemes: ["http", "https"],
    info: {
      contact: {
        name: "Dominik Bosnjak",
        email: "dominik.bosnjak94@gmail.com",
      },
    },
    host: `${ip}:${port}`,
    basePath: "/api",
    paths,
    definitions,
    responses,
    parameters: {},
  };
}
