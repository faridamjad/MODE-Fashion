
import React, { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "./apiClient";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const queryClient = useQueryClient();

  // GET ALL PRODUCTS
  const { data: products, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await apiClient.get("/products");
      return res.data.data;
    },
  });

  // GET CATEGORIES
  const getCategories = async () => {
    const res = await apiClient.get("/categories");
    return res.data;
  };

  // SHOW PRODUCT DETAIL
  const getProductById = async (id) => {
    const res = await apiClient.get(`/products/${id}`);
    return res.data.data;
  };
  
  // GET PRODUCTS WITH PAGINATION AND FILTER
  const getProducts = async ({
    page = 1,
    limit = 10,
    category_id = "",
    keyword = "",
  }) => {
    const res = await apiClient.get(
      `/products?page=${page}&limit=${limit}&category_id=${category_id}&keyword=${keyword}`
    );

    return res.data.data;
  };


  // STORE PRODUCT
  const addProduct = async (formData) => {
    const response = await apiClient.post("/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    await queryClient.invalidateQueries({
      queryKey: ["products"],
    });

    return response;
  };

  // UPDATE PRODUCT
  const updateProduct = async (id, formData) => {
    const response = await apiClient.post(
      `/products/${id}?_method=PUT`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    await queryClient.invalidateQueries({
      queryKey: ["products"],
    });

    return response;
  };

  // DELETE PRODUCT
  const deleteProduct = useMutation({
    mutationFn: async (id) => {
      return await apiClient.delete(`/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  return (
    
<ProductContext.Provider
  value={{
    products,
    isLoading,
    isError,
    getCategories,
    getProductById,
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  }}
>

      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
