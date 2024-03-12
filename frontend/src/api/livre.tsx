import axios from "axios";

import { API_URL } from "./endpoints";

import { LivreType, livreResponse } from "../types/livre";

export const getLivre = async (id: string): Promise<livreResponse> => {
  try {
    const response = await fetch(`${API_URL}/livre/${id}`, {
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

export const getAllLivre = async (): Promise<livreResponse> => {
  try {
    const response = await fetch(`${API_URL}/livre`, {
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

export const createLivre = async (data: LivreType): Promise<livreResponse> => {
  try {
    const response = await fetch(`${API_URL}/livre`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error: unknown) {
    return Promise.reject(error);
  }
};

export const updateLivre = async (
  id: string,
  data: LivreType
): Promise<livreResponse> => {
  try {
    const response = await axios.put(`${API_URL}/livre/${id}`, data);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteLivre = async (id: string): Promise<livreResponse> => {
  try {
    const response = await axios.delete(`${API_URL}/livre/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
