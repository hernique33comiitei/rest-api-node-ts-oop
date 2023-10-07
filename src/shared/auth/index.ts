import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export class Auth {
  public static auth() {
    return (req: Request, res: Response, next: NextFunction) => {
      const jwtAuth = req.headers["x-access-token"] as string;

      try {
        jwt.verify(jwtAuth, process.env["SECRET_KEY_JWT"]!);
        next();
      } catch (err) {
        return res.status(401).json({ error: "invalid token" });
      }
    };
  }
}
