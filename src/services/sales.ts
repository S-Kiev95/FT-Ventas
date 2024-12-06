import axios from 'axios';
import { CartItem } from '../types/cart';
import { API_CONFIG } from '../config/api.config';

interface SaleData {
  fecha: string;
  total: number;
  cliente: string | null;
  datos: {
    precio: number;
    cantidad: number;
    producto: number;
  }[];
}

export const createSale = async (items: CartItem[], total: number, cliente: string | null = null) => {
  const today = new Date().toISOString().split('T')[0];
  
  const saleData: SaleData = {
    fecha: today,
    total,
    cliente,
    datos: items.map(item => ({
      precio: item.precioVenta,
      cantidad: item.quantity,
      producto: item.id
    }))
  };

  try {
    const response = await axios.post(
      `${API_CONFIG.baseURL}/api/ventas`,
      { data: saleData },
      { headers: API_CONFIG.headers }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating sale:', error);
    throw error;
  }
};