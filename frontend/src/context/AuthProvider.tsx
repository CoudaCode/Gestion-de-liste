import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "../api/endpoints";
import {
  LoginFormInputs,
  LoginResponse,
  SignupFormInputs,
} from "./../types/user";

type Props = {
  children: React.ReactNode;
};
interface AuthContextState {
  user: LoginResponse | null;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  setUser: (user: LoginResponse | null) => void;
  Login: (data: LoginFormInputs) => Promise<void>;
  signup: (data: SignupFormInputs) => Promise<void>;
  logout: () => void;
}

const initialState: AuthContextState = {
  user: null,
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  setUser: () => {},
  Login: async () => {},
  signup: async () => {},
  logout: () => {},
};

export const AuthContext = createContext<AuthContextState>(initialState);
export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    initialState.isAuthenticated
  );

  const Login = async (data: LoginFormInputs) => {
    try {
      const response = await fetch(`${API_URL}/user/login`, {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const result = await response.json();
      if (response.ok) {
        setUser(result.message);
        setIsAuthenticated(true);
        Cookies.set("userConnect", result.token, { expires: 1 });
      }

      return result;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  const signup = async (data: SignupFormInputs) => {
    try {
      const response = await fetch(`${API_URL}/user/`, {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const result = await response.json();
      console.log(result);
      return result;
    } catch (e) {
      console.error(e);
    }
  };

  const logout = () => {
    Cookies.remove("userConnect");
    setUser(null);
    setIsAuthenticated(false);
  };
  useEffect(() => {
    const token = Cookies.get("userConnect");
    console.log("istoken exits", token);
    if (token) {
      setIsAuthenticated(true);
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        setIsAuthenticated,
        user,
        isAuthenticated,
        setUser,
        Login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
