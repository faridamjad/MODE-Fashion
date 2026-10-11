import { Link } from "react-router-dom";
import { useFavorite } from "../../context/FavoriteContext";

export default function Favorites() {
  const { favorites, toggleFavorite } = useFavorite();

  if (favorites.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-8 py-20 text-center">
        <div className="text-6xl">♡</div>

        <h1 className="text-3xl font-bold mt-5">
          Belum Ada Favorit
        </h1>

        <p className="text-gray-500 mt-3">
          Simpan produk yang kamu sukai dengan menekan tombol hati.
        </p>

        <Link
          to="/"
          className="inline-block bg-black text-white px-6 py-3 rounded-lg mt-6"
        >
          Lihat Produk
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <div className="text-center mb-10">
        <p className="text-sm uppercase tracking-widest text-gray-500">
          My Collection
        </p>

        <h1 className="text-4xl font-bold mt-2">
          Produk Favorit ❤️
        </h1>

        <p className="text-gray-500 mt-3">
          Produk yang kamu simpan sebagai favorit.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {favorites.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl overflow-hidden border shadow-sm"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-80 object-cover"
              />

              <button
                onClick={() => toggleFavorite(product)}
                className="absolute top-4 right-4 bg-white w-10 h-10 rounded-full shadow flex items-center justify-center text-xl"
              >
                ❤️
              </button>
            </div>

            <div className="p-5">
              <p className="text-sm text-gray-500">
                {product.category}
              </p>

              <h2 className="text-xl font-bold mt-1">
                {product.name}
              </h2>

              <p className="text-yellow-500 mt-2">
                ⭐ {product.rating}
              </p>

              <p className="text-xl font-bold mt-3">
                Rp {product.price.toLocaleString("id-ID")}
              </p>

              <Link
                to={`/product/${product.id}`}
                className="block text-center bg-black text-white py-3 rounded-lg mt-5"
              >
                Lihat Produk
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}