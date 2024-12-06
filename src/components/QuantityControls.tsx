import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface QuantityControlsProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export const QuantityControls: React.FC<QuantityControlsProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
        <button
          onClick={onDecrease}
          className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-600 dark:text-gray-300"
          aria-label="Reducir cantidad"
        >
          <Minus size={16} />
        </button>
        
        <span className="w-8 text-center font-medium text-gray-800 dark:text-white">{quantity}</span>
        
        <button
          onClick={onIncrease}
          className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-600 dark:text-gray-300"
          aria-label="Aumentar cantidad"
        >
          <Plus size={16} />
        </button>

        <button
          onClick={onRemove}
          className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
          aria-label="Eliminar producto"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};