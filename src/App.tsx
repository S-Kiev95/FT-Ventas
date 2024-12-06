import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { ProductList } from './pages/ProductList';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { useCartStore } from './store/useCartStore';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';

// Puedes reemplazar esta URL con la que prefieras
const LOGO_URL = "https://cdn.pixabay.com/photo/2017/01/31/23/42/animal-2028258_640.png";

function App() {
  const items = useCartStore((state) => state.items);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
          <nav className="bg-white dark:bg-gray-800 shadow-md">
            <div className="container mx-auto px-4 py-3">
              <div className="flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2">
                  <img 
                    src={LOGO_URL}
                    alt="Mi Tienda Logo" 
                    className="h-8 w-auto object-contain"
                  />
                  <span className="text-lg font-semibold text-gray-800 dark:text-white">
                    Tienda
                  </span>
                </Link>
                <div className="flex items-center gap-4">
                  <ThemeToggle />
                  <Link
                    to="/cart"
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                  >
                    <ShoppingCart />
                    {itemCount > 0 && (
                      <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {itemCount}
                      </span>
                    )}
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;