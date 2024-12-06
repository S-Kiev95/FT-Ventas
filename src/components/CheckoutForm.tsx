import React, { useState } from 'react';
import { createSale } from '../services/sales';
import { CartItem } from '../types/cart';

interface CheckoutFormProps {
  items: CartItem[];
  total: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  items,
  total,
  onSuccess,
  onError,
}) => {
  const [loading, setLoading] = useState(false);
  const [cliente, setCliente] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await createSale(items, total, cliente || null);
      onSuccess();
    } catch (error) {
      onError('Error al procesar la venta. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 space-y-4">
      <div>
        <label htmlFor="cliente" className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
          Cliente (opcional)
        </label>
        <input
          id="cliente"
          type="text"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
          placeholder="Nombre del cliente"
          className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
        />
      </div>
      <button
        onClick={handleSubmit}
        disabled={loading || items.length === 0}
        className={`w-full px-6 py-3 text-white rounded-lg transition-colors ${
          loading || items.length === 0
            ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        {loading ? 'Procesando...' : 'Finalizar Compra'}
      </button>
    </div>
  );
};