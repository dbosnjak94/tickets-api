"use strict";

import { config } from "../config/index";
import mysql from "mysql2/promise";

const connection = mysql.createPool({
  host: config.host as string,
  user: config.user as string,
  password: config.password as string,
  database: config.database as string,
  waitForConnections: true,
  connectionLimit: 60,
  queueLimit: 1500,
  multipleStatements: true,
  dateStrings: true,
});

export { connection };
