import { useParams } from "react-router-dom";
import { products } from "../../utils/data";
import { useCart } from "../../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-8 py-20 text-center">
        <h1 className="text-3xl font-bold">
          Produk tidak ditemukan
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <div className="grid md:grid-cols-2 gap-12">

        {/* GAMBAR */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[500px] object-cover rounded-2xl"
          />
        </div>

        {/* DETAIL */}
        <div className="flex flex-col justify-center">

          <p className="text-gray-500">
            {product.category}
          </p>

          <h1 className="text-4xl font-bold mt-2">
            {product.name}
          </h1>

          <p className="text-yellow-500 mt-4">
            ⭐ {product.rating}
          </p>

          <p className="text-3xl font-bold mt-6">
            Rp {product.price.toLocaleString("id-ID")}
          </p>

          <p className="text-gray-600 leading-relaxed mt-6">
            {product.description}
          </p>

          <p className="mt-6">
            Stok tersedia:{" "}
            <span className="font-bold">
              {product.stock}
            </span>
          </p>

          <button
  onClick={() => addToCart(product)}
  className="bg-black text-white py-4 rounded-xl mt-8 hover:bg-gray-800"
>
  Tambah ke Keranjang
</button>

        </div>
      </div>
    </div>
  );
}