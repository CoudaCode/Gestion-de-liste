import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "../api/endpoints";
import { LoginFormInputs, SignupFormInputs, userType } from "./../types/user";

type Props = {
  children: React.ReactNode;
};

interface AuthContextState {
  user: userType | null;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  setUser: (user: userType | null) => void;
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
  const [user, setUser] = useState<userType | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    initialState.isAuthenticated
  );

  useEffect(() => {
    const token = Cookies.get("userConnect");

    if (token) {
      // Vérifier la validité du token et récupérer les données de l'utilisateur
      checkValidateToken(token);
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const checkValidateToken = async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/user/check-token`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        const userData = await response.json();
        console.log(userData);
        setUser(userData); // Mettez à jour les informations de l'utilisateur si le token est valide
        setIsAuthenticated(true);
      } else {
        logout();
      }
    } catch (error) {
      console.error("Erreur lors de la validation du token :", error);
      // Déconnectez l'utilisateur en cas d'erreur
      logout();
    }
  };

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
        Cookies.set("userConnect", result.token);
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
