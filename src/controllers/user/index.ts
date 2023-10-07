import { Request, Response } from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../../models/user";

type TUser = {
  email: string;
  name: string;
  password: string;
};

class ControllerUser {
  constructor() {
    this.create = this.create.bind(this);
    this.auth = this.auth.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
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
    const { name, password, email } = req.body;
    const hashPassword = this.hashPassword(password);

    const getIsEmailExist = await User.findOne({ email });
    if (getIsEmailExist) {
      return res.status(400).json({
        errors: "This email already exist in database",
      });
    }

    const id = (
      await User.create({
        nickname: name,
        password: hashPassword,
        email: email,
      })
    )._id;

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
    const { name, password, email } = req.body;
    const hashPassword = this.hashPassword(password);

    const user = await User.findOne({
      nickname: name,
      password: hashPassword,
      email: email,
    });

    if (!user) {
      return res.status(400).json({
        errors: "Email or password incorrect",
      });
    }

    const payloadUser = {
      _id: user._id,
      email: email,
      name: user.nickname,
    };
    const jwtUser = this.generateJwt(payloadUser, "1h");

    return res.status(200).json({
      jwtAuth: jwtUser,
    });
  }

  public profile(req: Request, res: Response): Response {
    const tokenSession = req.headers["x-access-token"] as string;
    const dataUser = jwt.decode(tokenSession);

    return res.status(200).json({ dataUser });
  }

  public async updateProfile(req: Request, res: Response): Promise<Response> {
    const tokenSession = req.headers["x-access-token"] as string;
    const { email } = jwt.decode(tokenSession) as TUser;
    const { password, newPassword } = req.body;

    const hashPassword = this.hashPassword(password);

    const user = await User.findOne({ email: email, password: hashPassword });

    if (!user) {
      return res.status(401).json({ error: "password is invalid" });
    }

    await User.findByIdAndUpdate(user._id, {
      $set: { password: this.hashPassword(newPassword) },
    });

    return res.status(200).json({ sucess: "password changed successfully" });
  }
}

export default new ControllerUser();
