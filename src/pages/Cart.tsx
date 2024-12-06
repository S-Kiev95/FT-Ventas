import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { CheckoutForm } from '../components/CheckoutForm';
import { QuantityControls } from '../components/QuantityControls';

export const Cart: React.FC = () => {
  const { items, removeItem, updateQuantity, total, applyDiscount } = useCartStore();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleCheckoutSuccess = () => {
    setSuccess(true);
    items.forEach(item => removeItem(item.id));
  };

  const handleCheckoutError = (errorMessage: string) => {
    setError(errorMessage);
    setTimeout(() => setError(null), 5000);
  };

  if (success) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4">¡Compra realizada con éxito!</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">Gracias por tu compra</p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Volver a la tienda
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mb-6"
        >
          <ArrowLeft size={20} />
          Volver a la tienda
        </Link>
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Tu carrito está vacío</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">¿Por qué no agregas algunos productos?</p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Explorar productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mb-6"
      >
        <ArrowLeft size={20} />
        Seguir comprando
      </Link>

      {error && (
        <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 rounded">
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Tu Carrito</h1>
        
        <div className="space-y-6">
          {items.map((item) => {
            const itemPrice = item.precioVenta;
            const itemDiscount = item.discount || 0;
            const itemQuantity = item.quantity;
            const itemTotal = (itemPrice - itemDiscount) * itemQuantity;
            
            console.log('Item values:', {
              name: item.nombre,
              price: itemPrice,
              discount: itemDiscount,
              quantity: itemQuantity,
              total: itemTotal
            });
            
            return (
              <div key={item.id} className="flex items-center flex-col border-b dark:border-gray-700 pb-6">
                <div className="flex flex-col items-center w-full gap-4">
                  <div className="relative w-24 aspect-square">
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  </div>
                  
                  <div className="text-center w-full">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{item.nombre}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-1">
                      ${itemPrice.toFixed(2)}
                      {itemDiscount > 0 && (
                        <span className="ml-2 text-sm text-green-600 dark:text-green-400">
                          (-${itemDiscount.toFixed(2)})
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Total: ${itemTotal.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-4 w-full max-w-xs">
                    <QuantityControls
                      quantity={item.quantity}
                      onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                      onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                      onRemove={() => removeItem(item.id)}
                    />
                    <button
                      onClick={() => applyDiscount(item.id)}
                      className="w-full px-6 py-2 text-base bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Aplicar -$10
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-8 border-t dark:border-gray-700 pt-6">
          <div className="text-center mb-6">
            <div className="text-2xl font-bold text-gray-800 dark:text-white">
              Total: ${total().toFixed(2)}
            </div>
          </div>

          <CheckoutForm
            items={items}
            total={total()}
            onSuccess={handleCheckoutSuccess}
            onError={handleCheckoutError}
          />
        </div>
      </div>
    </div>
  );
};