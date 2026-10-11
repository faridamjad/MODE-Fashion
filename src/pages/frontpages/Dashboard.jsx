import { useState } from "react";
import { products } from "../../utils/data";
import ProductCard from "../../components/ProductCard";

export default function Dashboard() {
  const [category, setCategory] = useState("Semua");
  const [search, setSearch] = useState("");

  const categories = [
    "Semua",
    "Baju",
    "Celana",
    "Sepatu",
    "Jaket",
  ];

  const filteredProducts = products.filter((product) => {
    const matchCategory =
      category === "Semua" ||
      product.category === category;

    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div
      id="produk"
      className="max-w-6xl mx-auto px-6 py-10"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold">
          Daftar Produk
        </h2>

        <p className="text-gray-600 mt-2">
          Pilih produk fashion yang kamu suka.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari produk..."
          className="flex-1 border rounded-lg px-4 py-3 outline-none focus:border-black"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-lg px-4 py-3 bg-white"
          id="kategori"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item === "Semua"
                ? "Semua Kategori"
                : item}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 py-10">
          Produk tidak ditemukan.
        </p>
      )}
    </div>
  );
}
