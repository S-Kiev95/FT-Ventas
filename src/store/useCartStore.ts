import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types/product';

interface CartItem {
  id: number;
  nombre: string;
  precioVenta: number;
  imagen: string;
  quantity: number;
  discount: number;
}

interface CartState {
  items: CartItem[];
}

interface CartActions {
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  applyDiscount: (productId: number) => void;
  total: () => number;
}

type CartStore = CartState & CartActions;

const mapProductToCartItem = (product: Product): CartItem => {
  return {
    id: product.id,
    nombre: product.attributes.nombre,
    precioVenta: product.attributes.precioVenta,
    imagen: product.attributes.imagen[0]?.children?.find(child => child.url)?.url || '',
    quantity: 1,
    discount: 0,
  };
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        set((state) => {
          const existingItem = state.items.find(item => item.id === product.id);
          
          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          
          return {
            items: [...state.items, mapProductToCartItem(product)],
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        set((state) => ({
          items: state.items.map(item =>
            item.id === productId
              ? { ...item, quantity: Math.max(0, quantity) }
              : item
          ).filter(item => item.quantity > 0),
        }));
      },

      applyDiscount: (productId) => {
        set((state) => ({
          items: state.items.map(item =>
            item.id === productId
              ? { ...item, discount: item.discount + 10 }
              : item
          ),
        }));
      },

      total: () => {
        const { items } = get();
        return items.reduce((sum, item) => {
          const itemPrice = item.precioVenta;
          const itemDiscount = item.discount || 0;
          const itemQuantity = item.quantity;
          const itemTotal = (itemPrice - itemDiscount) * itemQuantity;
          return sum + itemTotal;
        }, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);