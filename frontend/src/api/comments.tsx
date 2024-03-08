import axios from "axios";
import { commentTypes } from "../types/comment";
const API_URL = "http://localhost:3000/api";

export const getComment = async (livreId: string, commentId: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/livres/${livreId}/comment/${commentId}`
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllComment = async (livreId: string) => {
  try {
    const response = await axios.get(`${API_URL}/livres/${livreId}/comments`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createComment = async (livreId: string, data: commentTypes) => {
  try {
    const response = await axios.post(
      `${API_URL}/livres/${livreId}/comment`,
      data
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateComment = async (
  livreId: string,
  commentId: string,
  data: commentTypes
) => {
  try {
    const response = await axios.put(
      `${API_URL}/livres/${livreId}/comment/${commentId}`,
      data
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteComment = async (livreId: string, commentId: string) => {
  try {
    const response = await axios.delete(
      `${API_URL}/livres/${livreId}/comment/${commentId}`
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
