import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const ProductDisplay = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://translator-0dye.onrender.com/api/products");
        const data = await response.json();
        // Filter products with category "Two Wheeler Lights"
        const filteredProducts = data.filter(
          (product) => product.category === "Decorative Lights"
        );
        setProducts(filteredProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle product deletion
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://translator-0dye.onrender.com/api/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the deleted product from the state
        setProducts(products.filter((product) => product._id !== id));
        alert("Product deleted successfully!");
      } else {
        alert("Failed to delete product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Handle product edit navigation
  const handleEdit = (id) => {
    navigate(`/components/update/${id}`); // Navigate to the update page
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Decorative Lights</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={`data:image/jpeg;base64,${product.image}`}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600">Volt: {product.volt}</p>
              <p className="text-gray-600">Part No: {product.partNo}</p>
              <div className="flex items-center">
    <p className="text-gray-600 mr-2">Color:</p>
    <div
      className="w-6 h-6 rounded-full border border-gray-400"
      style={{ backgroundColor: product.color }}
    ></div>
  </div>
              <p className="text-gray-600">Stock: {product.stock}</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEdit(product._id)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDisplay;