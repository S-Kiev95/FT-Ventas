import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../types/product';

interface ProductDetailCardProps {
  product: Product;
  onAddToCart: () => void;
}

export const ProductDetailCard: React.FC<ProductDetailCardProps> = ({ product, onAddToCart }) => {
  const imageUrl = product.attributes.imagen[0]?.children?.find(child => child.url)?.url || '';
  const description = product.attributes.descripcion || [];

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <div className="relative h-96 w-full md:w-96">
            <img
              className="absolute inset-0 w-full h-full object-contain p-4"
              src={imageUrl}
              alt={product.attributes.nombre}
              loading="lazy"
            />
          </div>
        </div>
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {product.attributes.nombre}
          </h1>
          <div className="mt-4">
            <p className="text-2xl font-bold text-gray-900">
              ${product.attributes.precioVenta.toFixed(2)}
            </p>
            <p className="mt-2 text-gray-600">
              Stock disponible: {product.attributes.stock}
            </p>
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Descripción:</h2>
            <div className="mt-2 text-gray-600">
              {description.map((desc, index) => (
                <p key={index}>{desc.children[0]?.text || ''}</p>
              ))}
            </div>
          </div>
          <button
            onClick={onAddToCart}
            className="mt-8 flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <ShoppingCart size={20} />
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};