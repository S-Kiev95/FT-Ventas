export const API_CONFIG = {
  baseURL: 'https://starpi-ventas-production.up.railway.app',
  headers: {
    'Content-Type': 'application/json'
  },
  endpoints: {
    products: '/api/productos',
  }
} as const;

export const USE_MOCK = false;