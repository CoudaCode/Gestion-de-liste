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
  user: LoginResponse["message"] | null;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  setUser: (user: LoginResponse["message"] | null) => void;
  Login: (data: LoginFormInputs) => Promise<void>;
  signup: (data: SignupFormInputs) => Promise<void>;
  logout: () => void;
}

const initialState: AuthContextState = {
  user: null,
  isAuthenticated: Cookies.get("userConnect") !== undefined,
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
  const [user, setUser] = useState<LoginResponse["message"] | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    initialState.isAuthenticated
  );

  useEffect(() => {
    const token = Cookies.get("userConnect");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

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
      console.log(result);
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
