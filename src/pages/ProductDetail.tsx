import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../services/api';
import { useCartStore } from '../store/useCartStore';
import { Product } from '../types/product';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { ProductDetailCard } from '../components/ProductDetailCard';
import { BackButton } from '../components/BackButton';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError('ID de producto no válido');
        setLoading(false);
        return;
      }

      try {
        const response = await getProduct(Number(id));
        if (response.data) {
          setProduct(response.data);
          setError(null);
        } else {
          setError('Producto no encontrado');
        }
      } catch (err) {
        setError('Error al cargar el producto');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!product) return <ErrorMessage message="Producto no encontrado" />;

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton />
      <ProductDetailCard 
        product={product} 
        onAddToCart={() => addItem(product)} 
      />
    </div>
  );
};