import { Request, Response } from "express";
import crypto from "crypto";
import User from "../../models/user";

class ControllerUser {
  constructor() {
    this.create = this.create.bind(this);
  }

  private hashPassword(password: string): string {
    const hash = crypto.createHash("sha256").update(password).digest("hex");
    return hash;
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const body = req.body;
    const password = this.hashPassword(body["password"]);

    const id = (await User.create({ nickname: body["name"], password }))._id;

    return res.status(201).json({
      success: {
        default: {
          message: "User created",
          userId: id,
        },
      },
    });
  }
}

export default new ControllerUser();
