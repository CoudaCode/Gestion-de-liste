import { Request, Response, NextFunction } from "express";
import { tokenVerify } from "../utils/token";
import {AuthRequest} from "./../interface/authRequest"
const Auth = (
  req: AuthRequest | Request,
  res: Response,
  next: NextFunction
): Response | void => {
  // const token:string = req.cookies.token
  
  const token: string | undefined = req.headers.authorization?.split(" ")[1];

  const isTokenExist =
    typeof token == "string"
      ? tokenVerify(token)
      : res.status(401).json({ message: "Unauthorized" });

  if (typeof isTokenExist === "object") {
    req["auth"] = isTokenExist;
  } else {
    res.redirect("/login");
  }
  next();
};

export default Auth;
