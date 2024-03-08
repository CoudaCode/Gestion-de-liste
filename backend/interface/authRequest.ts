import { Request } from "express";
import { IUser } from "../models/users";

interface AuthRequest extends Request {
  auth?: IUser;
}

export { AuthRequest };
