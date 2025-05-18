import axios from 'axios';
import { Todo } from '../types/todo';

const API_URL = 'http://localhost:3001/todos';

export const todoService = {
  getAll: async (): Promise<Todo[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  create: async (todo: Omit<Todo, 'id'>): Promise<Todo> => {
    const response = await axios.post(API_URL, todo);
    return response.data;
  },

  update: async (id: number, todo: Partial<Todo>): Promise<Todo> => {
    const response = await axios.put(`${API_URL}/${id}`, todo);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  }
}; 