import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../types/product';
import { useCartStore } from '../store/useCartStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  
  const imageUrl = product.attributes.imagen?.[0]?.children?.find(child => child.url)?.url || '';
  const price = product.attributes.precioVenta || 0;
  const description = product.attributes.descripcion?.[0]?.children?.[0]?.text || 'Sin descripción';
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      <div className="relative pt-[100%]">
        <img
          src={imageUrl}
          alt={product.attributes.nombre}
          className="absolute inset-0 w-full h-full object-contain p-4 bg-white dark:bg-gray-800"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1 line-clamp-2">
          {product.attributes.nombre}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
          {description}
        </p>
        <div className="flex justify-between items-center mb-4">
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            ${price.toFixed(2)}
          </p>
          <span className="text-sm px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300">
            Stock: {product.attributes.stock}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => navigate(`/product/${product.id}`)}
            className="flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
          >
            <Eye size={16} />
            <span>Ver detalle</span>
          </button>
          <button
            onClick={() => addItem(product)}
            className="flex items-center justify-center gap-1.5 px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
          >
            <ShoppingCart size={16} />
            <span>Agregar</span>
          </button>
        </div>
      </div>
    </div>
  );
};