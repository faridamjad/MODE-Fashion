import { useNavigate } from "react-router-dom";
import { useFavorite } from "../context/FavoriteContext";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorite();

  return (
    <div className="bg-white border rounded-lg overflow-hidden">

      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
        />

        <button
          onClick={() => toggleFavorite(product)}
          className="absolute top-3 right-3 bg-white border rounded-full w-9 h-9"
          aria-label={
            isFavorite(product.id)
              ? "Hapus dari favorit"
              : "Tambah ke favorit"
          }
        >
          {isFavorite(product.id) ? "❤️" : "♡"}
        </button>
      </div>

      <div className="p-4">
        <p className="text-sm text-gray-500">
          {product.category}
        </p>

        <h3 className="font-semibold text-lg mt-1">
          {product.name}
        </h3>

        <p className="text-gray-600 mt-2">
          Rp {product.price.toLocaleString("id-ID")}
        </p>

        <button
          onClick={() =>
            navigate(`/product/${product.id}`)
          }
          className="w-full border border-black rounded-md py-2 mt-4 hover:bg-black hover:text-white"
        >
          Lihat Detail
        </button>
      </div>

    </div>
  );
}
