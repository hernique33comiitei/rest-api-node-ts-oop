import { Request, Response } from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../../models/user";

class ControllerUser {
  constructor() {
    this.create = this.create.bind(this);
    this.auth = this.auth.bind(this);
  }

  private hashPassword(password: string): string {
    const hash = crypto.createHash("sha256").update(password).digest("hex");
    return hash;
  }

  private generateJwt<T>(payload: T, expiresIn: string): string {
    const jwtUser = jwt.sign(payload!, process.env["SECRET_KEY_JWT"]!, {
      expiresIn,
    });

    return jwtUser;
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, password } = req.body;
    const hashPassword = this.hashPassword(password);

    const getIsNameExist = await User.findOne({ nickname: name });
    if (getIsNameExist) {
      return res.status(400).json({
        errors: "This name already exist in database",
      });
    }

    const id = (await User.create({ nickname: name, password: hashPassword }))
      ._id;

    return res.status(201).json({
      success: {
        default: {
          message: "User created",
          userId: id,
        },
      },
    });
  }

  public async auth(req: Request, res: Response): Promise<Response> {
    const { name, password } = req.body;
    const hashPassword = this.hashPassword(password);

    const user = await User.findOne({ nickname: name, password: hashPassword });

    if (!user) {
      return res.status(400).json({
        errors: "User or password incorrect",
      });
    }

    const payloadUser = {
      _id: user._id,
      name: user.nickname,
      password: user.password,
    };
    const jwtUser = this.generateJwt(payloadUser, "1d");

    return res.status(200).json({
      jwtAuth: jwtUser,
    });
  }
}

export default new ControllerUser();
