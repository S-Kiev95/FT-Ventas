import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import { ProductCard } from '../components/ProductCard';
import { SearchBar } from '../components/SearchBar';
import { Product } from '../types/product';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';

export const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data || []);
        setError(null);
      } catch (err) {
        setError('Error al cargar los productos');
        console.error('Error fetching products:', err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.attributes.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">
        Productos
      </h1>
      
      <div className="max-w-2xl mx-auto mb-8">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Buscar productos por nombre..."
        />
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-10 text-gray-600 dark:text-gray-300">
          {searchTerm ? (
            <p className="text-xl">No se encontraron productos que coincidan con "{searchTerm}"</p>
          ) : (
            <>
              <p className="text-xl">No hay productos disponibles</p>
              <p className="mt-2">Vuelve a intentarlo más tarde</p>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};