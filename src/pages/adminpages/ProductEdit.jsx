
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useProducts } from "../../utils/ProductContext";

export default function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getProductById, getCategories, updateProduct } = useProducts();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category_id: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  // Ambil data produk berdasarkan ID
  const { isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const product = await getProductById(id);

      setFormData({
        name: product.name || "",
        price: product.price || "",
        stock: product.stock || "",
        category_id: product.category_id || "",
        description: product.description || "",
      });

      return product;
    },
  });

  // Ambil kategori
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  // Mengatur perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit perubahan
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const data = new FormData();

    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("stock", formData.stock);
    data.append("category_id", formData.category_id);
    data.append("description", formData.description);

    try {
      await updateProduct(id, data);

      toast.success("Produk berhasil diperbarui!");
      navigate("/admin/dashboard");
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
        toast.error("Periksa kembali data yang dimasukkan.");
      } else {
        toast.error("Gagal memperbarui produk.");
      }
    }
  };

  if (isLoading) {
    return <p className="p-4">Memuat data produk...</p>;
  }

  if (isError) {
    return <p className="p-4">Gagal memuat produk.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">
        Edit Produk
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nama */}
        <div className="flex flex-col">
          <label>Nama Produk</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border rounded-md p-2"
          />
          {errors.name && (
            <p className="text-red-500">{errors.name[0]}</p>
          )}
        </div>

        {/* Harga */}
        <div className="flex flex-col">
          <label>Harga</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="border rounded-md p-2"
          />
          {errors.price && (
            <p className="text-red-500">{errors.price[0]}</p>
          )}
        </div>

        {/* Stok */}
        <div className="flex flex-col">
          <label>Stok</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="border rounded-md p-2"
          />
          {errors.stock && (
            <p className="text-red-500">{errors.stock[0]}</p>
          )}
        </div>

        {/* Kategori */}
        <div className="flex flex-col">
          <label>Pilih Kategori</label>
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="border rounded-md p-2"
          >
            <option value="">-- Pilih Kategori --</option>

            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.category}
              </option>
            ))}
          </select>
          {errors.category_id && (
            <p className="text-red-500">{errors.category_id[0]}</p>
          )}
        </div>

        {/* Deskripsi */}
        <div className="flex flex-col">
          <label>Deskripsi</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border rounded-md p-2"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description[0]}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
        >
          Update Produk
        </button>
      </form>
    </div>
  );
}
