import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user/";
dotenv.config();

export class App {
  private express: express.Application;
  private port = 9000;

  constructor() {
    this.express = express();
    this.database();
    this.middlewares();
    this.routes();
    this.listen();
  }

  public getApp(): express.Application {
    return this.express;
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private listen(): void {
    this.express.listen(this.port, () => {
      console.log("Server is running!");
    });
  }

  private database(): void {
    mongoose.connect(process.env["STRING_CONNECT_DATABASE"]!);
  }

  private routes(): void {
    this.express.use("/user", userRouter);
  }
}
