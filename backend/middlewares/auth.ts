import { Request, Response, NextFunction } from "express";
import { tokenVerify } from "../utils/token";
import { AuthRequest } from "./../interface/authRequest";
import { IUser } from "../models/users";

const Auth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Response | void => {
  const token: string | undefined = req.cookies.token || req.headers.authorization?.split(" ")[1];
  const isTokenExist =
    typeof token === "string"
      ? tokenVerify(token)
      : res.status(401).json({ message: "Unauthorized" });

  if (typeof isTokenExist === "object") {
    req.auth = isTokenExist as IUser;
    next();
  } else {
    res.redirect("/login");
  }
};

export default Auth;
