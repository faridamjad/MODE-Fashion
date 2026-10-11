import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import logo from "../assets/Logo.png";

export default function Navbar() {
  const { cart } = useCart();

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center">
  <img
    src={logo}
    alt="MODE"
    className="h-20 w-auto"
  />
</Link>

        {/* Menu */}
        <div className="flex items-center gap-8 text-sm font-medium">

          <Link
            to="/"
            className="hover:text-gray-500 transition"
          >
            Home
          </Link>

          <a
            href="/#produk"
            className="hover:text-gray-500 transition"
          >
            Produk
          </a>

          <a
            href="/#kategori"
            className="hover:text-gray-500 transition"
          >
            Kategori
          </a>

          <Link
            to="/favorites"
            className="hover:text-gray-500 transition"
          >
            ♡ Favorit
          </Link>

          <Link
            to="/cart"
            className="relative hover:text-gray-500 transition"
          >
            🛒 Keranjang

            {totalItems > 0 && (
              <span className="absolute -top-3 -right-4 bg-black text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

        </div>
      </div>
    </nav>
  );
}