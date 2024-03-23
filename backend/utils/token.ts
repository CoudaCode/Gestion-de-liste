import { sign, verify } from "jsonwebtoken";

export const generateToken = (payload: string): string => {
  const jwtSecret: string | undefined = process.env.JWTSECRET;
  if (!jwtSecret) throw new Error("Verifié votre code secret token");
  return sign(payload, jwtSecret, {
    expiresIn: "3m",
  });
};

export const tokenVerify = (
  token: string | undefined
): boolean | object | string => {
  try {
    const jwtSecret: string | undefined = process.env.JWTSECRET;
    if (!jwtSecret || !token)
      throw new Error(
        "Verifié votre code secret token ou la clé token est vide"
      );
    return verify(token, jwtSecret);
  } catch (e) {
    return false;
  }
};
