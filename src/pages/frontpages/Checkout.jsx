import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function Checkout() {
  const { cart, totalPrice } = useCart();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "Transfer Bank",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Pesanan berhasil dibuat!");
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold">
          Keranjang Kosong
        </h1>
        <Link to="/" className="inline-block mt-4 underline">
          Kembali Belanja
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">
        Checkout
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="border rounded-lg p-5 space-y-4">
          <h2 className="text-xl font-semibold">
            Informasi Pengiriman
          </h2>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nama lengkap"
            required
            className="w-full border rounded-md p-3"
          />

          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="Nomor HP"
            required
            className="w-full border rounded-md p-3"
          />

          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Alamat lengkap"
            required
            rows={3}
            className="w-full border rounded-md p-3"
          />

          <select
            name="payment"
            value={form.payment}
            onChange={handleChange}
            className="w-full border rounded-md p-3 bg-white"
          >
            <option>Transfer Bank</option>
            <option>COD</option>
            <option>E-Wallet</option>
          </select>
        </div>

        <div className="border rounded-lg p-5">
          <h2 className="text-xl font-semibold mb-4">
            Ringkasan Pesanan
          </h2>

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between gap-4 py-2"
            >
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>
                Rp {(item.price * item.quantity).toLocaleString("id-ID")}
              </span>
            </div>
          ))}

          <div className="border-t mt-3 pt-4 flex justify-between font-bold">
            <span>Total</span>
            <span>
              Rp {totalPrice.toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white rounded-md py-3 hover:bg-gray-800"
        >
          Buat Pesanan
        </button>
      </form>
    </div>
  );
}