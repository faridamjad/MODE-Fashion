import { useProducts } from "../../utils/ProductContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import ProductSearchBar from "../../components/ProductSearchBar";
import { useState } from "react";

export default function AdminDashboard() {
const {
  products,
  isLoading,
  isError,
  deleteProduct,
  getProducts,
} = useProducts();
const [searchResults, setSearchResults] = useState(null);
const handleSearch = async ({ keyword }) => {
  try {
    const result = await getProducts({ keyword });
    setSearchResults(result);
  } catch (error) {
    console.error("Gagal mencari produk:", error);
  }
};

  if (isLoading) {
    return <div className="p-6">Memuat produk...</div>;
  }

  if (isError) {
    return <div className="p-6">Gagal mengambil data produk.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Dashboard Admin
      </h1>
      <ProductSearchBar onSearch={handleSearch} />

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Gambar</th>
              <th className="p-3">Nama Produk</th>
              <th className="p-3">Harga</th>
              <th className="p-3">Stok</th>
              <th className="p-3">Kategori</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>

          <tbody>
{(searchResults ?? products)?.map((product) => (
                <tr key={product.id} className="border-t">
                <td className="p-3">
                  {product.img_url ? (
                    <img
                      src={product.img_url}
                      alt={product.name}
                      className="w-16 h-16 object-cover"
                    />
                  ) : (
                    "Belum ada gambar"
                  )}
                </td>

                <td className="p-3">{product.name}</td>

                <td className="p-3">
                  Rp {Number(product.price).toLocaleString("id-ID")}
                </td>

                <td className="p-3">{product.stock}</td>

                <td className="p-3">
                  {product.category?.category || "-"}
                </td>

                <td className="p-3">
                  <Link
  to={`/admin/edit-product/${product.id}`}
  className="text-blue-600 mr-3"
>
  Edit
</Link>

                  <button
  className="text-red-600"
  onClick={() => {
    if (window.confirm("Yakin ingin menghapus produk ini?")) {
      deleteProduct.mutate(product.id, {
        onSuccess: () => {
          toast.success("Produk berhasil dihapus!");
        },
        onError: () => {
          toast.error("Gagal menghapus produk.");
        },
      });
    }
  }}
>
  Hapus
</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}