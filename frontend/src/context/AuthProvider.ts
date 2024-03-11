import { createContext, useContext, useEffect, useState } from "react";
import {
  LoginFormInputs,
  LoginResponse,
  SignupFormInputs,
} from "../types/user";

interface AuthContextState {
  user: LoginResponse | null;
  isAuthenticated: boolean;
  setUser: (user: LoginResponse | null) => void;
  login: (data: LoginFormInputs) => Promise<void>;
  signup: (data: SignupFormInputs) => Promise<void>;
  logout: () => void;
}

const initialState: AuthContextState = {
  user: null,
  isAuthenticated: false,
  setUser: () => {},
  login: async () => {},
  signup: async () => {},
  logout: () => {},
};

export const AuthContext = createContext(initialState);

export const useAuth = () => useContext(AuthContext);
export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing user in local storage (optional)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (data: LoginFormInputs) => {
    try {
      const response = await fetch(`${API_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const result = await response.json();
      setUser(result);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(result)); // Store in local storage (optional)
    } catch (error) {
      console.error("Login error:", error);
      // Handle login errors (e.g., display error messages)
    }
  };

  const signup = async (data: SignupFormInputs) => {
    // ... similar structure as login
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user"); // Remove from local storage (optional)
  };

  // **Corrected Provider Value:** Pass the actual state values
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, setUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
