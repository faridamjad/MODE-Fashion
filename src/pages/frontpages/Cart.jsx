import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    totalPrice,
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold">
          Keranjang Kosong
        </h1>

        <p className="text-gray-500 mt-2">
          Yuk, pilih produk yang kamu suka!
        </p>

        <Link
          to="/"
          className="inline-block mt-4 underline"
        >
          Kembali Belanja
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">
        Keranjang Belanja
      </h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 border rounded-lg p-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-md"
            />

            <div className="flex-1">
              <h2 className="font-semibold">
                {item.name}
              </h2>

              <p className="text-gray-600 mt-1">
                Rp {item.price.toLocaleString("id-ID")}
              </p>

              <div className="flex items-center gap-3 mt-3">
                <button
                  type="button"
                  onClick={() =>
                    updateQuantity(
                      item.id,
                      Math.max(1, item.quantity - 1)
                    )
                  }
                  className="border rounded px-3 py-1"
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  type="button"
                  onClick={() =>
                    updateQuantity(
                      item.id,
                      item.quantity + 1
                    )
                  }
                  className="border rounded px-3 py-1"
                >
                  +
                </button>

                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 text-sm ml-2"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border rounded-lg p-5 mt-6">
        <div className="flex justify-between font-bold">
          <span>Total Harga</span>
          <span>
            Rp {totalPrice.toLocaleString("id-ID")}
          </span>
        </div>

        <Link
          to="/checkout"
          className="block text-center bg-black text-white rounded-md py-3 mt-5 hover:bg-gray-800"
        >
          Lanjut Checkout
        </Link>

        <Link
          to="/"
          className="block text-center mt-4 underline"
        >
          Lanjut Belanja
        </Link>
      </div>
    </div>
  );
}