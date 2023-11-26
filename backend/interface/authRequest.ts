import { Request } from "express";

interface AuthRequest extends Request {
  auth: object | null;
}

export {AuthRequest}