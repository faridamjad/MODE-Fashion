import { useState } from "react";
import { Outlet } from "react-router-dom"; 
import Navbar from "../components/Navbar"; 

export default function MainLayout() { 
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");

  return ( 
    <div className="flex flex-col min-h-screen"> 
      {/* Header/Navbar */} 
      <Navbar />

      {/* Search & Filter */} 
      <header className="bg-gray-100 p-4 flex flex-col md:flex-row gap-2 justify-between items-center"> 
        <input 
          type="text" 
          placeholder="Cari produk..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg" 
        /> 
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        > 
          <option value="Semua Kategori">Semua Kategori</option> 
          <option value="kaos">kaos</option> 
          <option value="celana">celana</option> 
          <option value="sepatu">sepatu</option> 
        </select> 
      </header> 

      {/* Main Section */} 
      <main className="flex-1 p-6"> 
        {/* Kirim state ke halaman anak melalui context */}
        <Outlet context={{ searchTerm, selectedCategory }} /> 
      </main> 

      {/* Footer */} 
      <footer className="bg-gray-800 text-white text-center p-4"> 
        <p>© 2025 E-Commerce Simple App | Version 1.0</p> 
      </footer> 
    </div> 
  ); 
}