import axios, { AxiosError } from 'axios';
import { Product } from '../types/product';
import { mockProducts } from './mockData';
import { API_CONFIG, USE_MOCK } from '../config/api.config';

const axiosInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
  headers: API_CONFIG.headers
});

export const getProducts = async (): Promise<{ data: Product[] }> => {
  if (USE_MOCK) {
    return Promise.resolve({ data: mockProducts });
  }
  
  try {
    const response = await axiosInstance.get(`${API_CONFIG.endpoints.products}?populate=*`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('API Error:', error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
    } else {
      console.error('Unexpected error:', error);
    }
    return { data: [] };
  }
};

export const getProduct = async (id: number): Promise<{ data: Product | null }> => {
  if (USE_MOCK) {
    const product = mockProducts.find(p => p.id === id);
    return Promise.resolve({ data: product || null });
  }
  
  try {
    const response = await axiosInstance.get(`${API_CONFIG.endpoints.products}/${id}?populate=*`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('API Error:', error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
    } else {
      console.error('Unexpected error:', error);
    }
    return { data: null };
  }
};