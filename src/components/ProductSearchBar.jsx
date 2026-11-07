import { useState } from "react";

export default function ProductSearchBar({ onSearch }) {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ keyword });
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Cari nama produk..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="border rounded p-2 flex-1"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Cari
      </button>
    </form>
  );
}