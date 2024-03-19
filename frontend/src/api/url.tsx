import Cookies from "js-cookie";
import { verify } from "jsonwebtoken";

export const API_URL = "http://localhost:3000";

// export const auth = () => {
//   const token = Cookies.get("userConnect");
//   console.log("istoken exits", token);
//   const decoded = verify(token, "1111111111111111111111111");
//   console.log("decoded", decoded);
//   // return {
//   //   isAuthenticated: token ? true : false,
//   //   user: decoded,
//   // };
// };
