import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types/product';

interface CartItem {
  id: number;
  nombre: string;
  precioVenta: number;
  precioCompra: number;
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
  resetDiscount: (productId: number) => void;
  clearCart: () => void;
  total: () => number;
}

type CartStore = CartState & CartActions;

const mapProductToCartItem = (product: Product): CartItem => {
  return {
    id: product.id,
    nombre: product.attributes.nombre,
    precioVenta: Number(product.attributes.precioVenta) || 0,
    precioCompra: Number(product.attributes.precioCompra) || 0,
    imagen: product.attributes.imagen?.[0]?.children?.find(child => child.url)?.url || '',
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
        set((state) => {
          const updatedItems = state.items.map(item => {
            if (item.id === productId) {
              const currentDiscount = item.discount || 0;
              const precioVenta = Number(item.precioVenta) || 0;
              const precioCompra = Number(item.precioCompra) || 0;
              
              const newDiscount = currentDiscount + 10;
              const finalPrice = precioVenta - newDiscount;
              
              if (finalPrice > 0) {
                return {
                  ...item,
                  discount: newDiscount
                };
              }
            }
            return item;
          });
          
          return { items: updatedItems };
        });
      },

      resetDiscount: (productId) => {
        set((state) => ({
          items: state.items.map(item =>
            item.id === productId
              ? { ...item, discount: 0 }
              : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
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