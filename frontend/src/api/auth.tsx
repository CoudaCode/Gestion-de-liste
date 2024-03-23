import { LoginFormInputs, SignupFormInputs } from "../types/user";
import { API_URL } from "./endpoints";

export const Login = async (data: LoginFormInputs) => {
  try {
    const response = await fetch(`${API_URL}/user/login`, {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const result = await response.json();

    return result;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const signup = async (data: SignupFormInputs) => {
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
