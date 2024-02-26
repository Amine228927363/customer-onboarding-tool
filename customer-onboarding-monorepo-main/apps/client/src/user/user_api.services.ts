import axios from 'axios';
import type User from '../models/UserRepresentation.ts';
const API_BASE_url = 'https://localhost:3000';
// const API_BASE_URL = process
export const UserApiService ={
    getAllUsers: async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(`${API_BASE_url}/user`);
    return response.data;
  } catch (error) {
    console.error('error getting users', error);
    throw error;
  }
  },
 createUser: async (userData:User): Promise<User> => {
    try {
      const response = await axios.post<User>(`${API_BASE_url}/user`, userData);
      return response.data;
    } catch (error) {
      console.error('error fetching user', error);
      throw error;
    }
    },
    updateUser: async (id:number,userData:User): Promise<User> => {
        try {
          const response = await axios.put<User>(`${API_BASE_url}/user/${id}`,userData);
          return response.data;
        } catch (error) {
          console.error('error updating user', error);
          throw error;
        }
        },

        deleteUser: async (userId: number): Promise<void> => {
            try {
                await axios.delete(`${API_BASE_url}/user/${userId}`);
            } catch (error) {
                console.error('Error deleting user:', error);
                throw error;
            }
        },

        getUserById: async (userId: number): Promise<User> => {
            try {
                const response = await axios.get<User>(`${API_BASE_url}/user/${userId}`);
                return response.data;
            } catch (error) {
                console.error('Error fetching user by ID:', error);
                throw error;
            }
        },

}