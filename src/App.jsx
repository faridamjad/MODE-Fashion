import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

import Dashboard from "./pages/frontpages/Dashboard";
import ProductDetail from "./pages/frontpages/ProductDetail";
import Cart from "./pages/frontpages/Cart";
import Checkout from "./pages/frontpages/Checkout";
import Favorites from "./pages/frontpages/Favorites";

import AdminDashboard from "./pages/adminpages/AdminDashboard";
import ProductForm from "./pages/adminpages/ProductForm";
import ProductEdit from "./pages/adminpages/ProductEdit";

import { CartProvider } from "./context/CartContext";
import { FavoriteProvider } from "./context/FavoriteContext";
import { ProductProvider } from "./utils/ProductContext";

function App() {
  return (
    <CartProvider>
      <FavoriteProvider>
        <ProductProvider>
          <BrowserRouter>
            <Navbar />

            <Routes>
              {/* Halaman utama */}
              <Route
                path="/"
                element={
                  <>
                    <Hero />
                    <Dashboard />
                  </>
                }
              />

              {/* Detail produk */}
              <Route
                path="/product/:id"
                element={<ProductDetail />}
              />

              {/* Keranjang */}
              <Route path="/cart" element={<Cart />} />

              {/* Checkout */}
              <Route path="/checkout" element={<Checkout />} />

              {/* Favorit */}
              <Route path="/favorites" element={<Favorites />} />

              {/* Admin */}
              <Route
                path="/admin/dashboard"
                element={<AdminDashboard />}
              />

              {/* Tambah produk */}
              <Route
                path="/admin/add-product"
                element={<ProductForm />}
              />

              {/* Edit produk */}
              <Route
                path="/admin/edit-product/:id"
                element={<ProductEdit />}
              />
            </Routes>
          </BrowserRouter>
        </ProductProvider>
      </FavoriteProvider>
    </CartProvider>
  );
}

export default App;
