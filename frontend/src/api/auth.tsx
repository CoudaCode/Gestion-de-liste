import {
  LoginFormInputs,
  LoginResponse,
  SignupFormInputs,
} from "../types/user";
import { API_URL } from "./endpoints";

export const login = async (data: LoginFormInputs): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const signup = async (
  data: SignupFormInputs
): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUser = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllUser = async (): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_URL}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateUser = async (
  id: string,
  data: SignupFormInputs
): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_URL}/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteUser = async (id: string): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_URL}/user/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};
