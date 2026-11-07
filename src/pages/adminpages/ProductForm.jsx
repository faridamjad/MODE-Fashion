
import React, { useState, useEffect } from "react";
import { useProducts } from "../../utils/ProductContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ProductForm() {
  const { addProduct, getCategories } = useProducts();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category_id: "",
    description: "",
    img: null,
  });

  const [errors, setErrors] = useState({});

  // Mengambil data kategori dari Laravel
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        toast.error("Gagal mengambil kategori.");
      }
    };

    fetchCategories();
  }, []);

  // Menangani perubahan input
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  // Menyimpan produk
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        data.append(key, value);
      }
    });

    try {
      await addProduct(data);

      toast.success("Produk berhasil disimpan!");

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1000);
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
        toast.error("Periksa kembali data yang dimasukkan.");
      } else {
        toast.error("Gagal menyimpan produk.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-6 space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Tambah Produk
      </h2>

      <div>
        <label>Nama Produk</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nama Produk"
          className="border rounded-md p-2 w-full"
        />
        {errors.name && (
          <p className="text-red-500">{errors.name[0]}</p>
        )}
      </div>

      <div>
        <label>Kategori</label>
        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          className="border rounded-md p-2 w-full"
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

      <div>
        <label>Harga</label>
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          placeholder="Harga Produk"
          className="border rounded-md p-2 w-full"
        />
        {errors.price && (
          <p className="text-red-500">{errors.price[0]}</p>
        )}
      </div>

      <div>
        <label>Stok</label>
        <input
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleChange}
          placeholder="Jumlah Stok"
          className="border rounded-md p-2 w-full"
        />
        {errors.stock && (
          <p className="text-red-500">{errors.stock[0]}</p>
        )}
      </div>

      <div>
        <label>Deskripsi</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Tuliskan deskripsi produk"
          rows="3"
          className="border rounded-md p-2 w-full"
        />
      </div>

      <div>
        <label>Gambar Produk</label>
        <input
          name="img"
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="border rounded-md p-2 w-full"
        />
        {errors.img && (
          <p className="text-red-500">{errors.img[0]}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
      >
        Simpan Produk
      </button>
    </form>
  );
}
