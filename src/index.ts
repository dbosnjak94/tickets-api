import express from "express";
import "dotenv/config";
import cors from "cors";

import routes from "./api";
import { Request, Response, NextFunction } from "express";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.use("/api", routes);

//Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({
    code: statusCode,
    message: err.message,
  });
});

app.listen(port, async () => {
  console.log("Server ready and working");
});
