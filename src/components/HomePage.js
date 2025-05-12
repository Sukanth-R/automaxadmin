import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AddProductPage = () => {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    volt: "",
    partNo: "",
    color: "",
    image: null,
    stock: "available", // Add stock field with default value
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct({ ...product, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/products", product);
      alert("Product added successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Product Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Link
              to="/components/products/water"
              className="block px-4 py-2 hover:bg-[#133E87] hover:text-white"
            >
              Water Proof LED Lights
            </Link>
            <Link
              to="/components/products/boat"
              className="block px-4 py-2 hover:bg-[#133E87] hover:text-white"
            >
              Boat Lights
            </Link>
            <Link
              to="/components/products/fog"
              className="block px-4 py-2 hover:bg-[#133E87] hover:text-white"
            >
              Fog Lights
            </Link>
            <Link
              to="/components/products/twowheel"
              className="block px-4 py-2 hover:bg-[#133E87] hover:text-white"
            >
              Two Wheeler Lights
            </Link>
            <Link
              to="/components/products/converter"
              className="block px-4 py-2 hover:bg-[#133E87] hover:text-white"
            >
              Converters
            </Link>
            <Link
              to="/components/products/roof"
              className="block px-4 py-2 hover:bg-[#133E87] hover:text-white"
            >
              Roof Lamps
            </Link>
            <Link
              to="/components/products/tail"
              className="block px-4 py-2 hover:bg-[#133E87] hover:text-white"
            >
              Tail Lamp Assembly
            </Link>
            <Link
              to="/components/products/side"
              className="block px-4 py-2 hover:bg-[#133E87] hover:text-white"
            >
              Side Indicators
            </Link>
            <Link
              to="/components/products/decorative"
              className="block px-4 py-2 hover:bg-[#133E87] hover:text-white"
            >
              Decorative Lights
            </Link>
          </div>
        </div>
        <h1 className="text-2xl font-bold mt-6">Add New Product</h1>
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#133E87] focus:border-[#133E87]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#133E87] focus:border-[#133E87]"
              required
            >
              <option value="">Select Category</option>
              <option value="Water Proof LED Lights">Water Proof LED Lights</option>
              <option value="Boat Lights">Boat Lights</option>
              <option value="Fog Lights">Fog Lights</option>
              <option value="Two Wheeler Lights">Two Wheeler Lights</option>
              <option value="Converters">Converters</option>
              <option value="Roof Lamps">Roof Lamps</option>
              <option value="Tail Lamp Assembly">Tail Lamp Assembly</option>
              <option value="Side Indicators">Side Indicators</option>
              <option value="Decorative Lights">Decorative Lights</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Voltage
            </label>
            <select
              name="volt"
              value={product.volt}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#133E87] focus:border-[#133E87]"
              required
            >
              <option value="">Select Voltage</option>
              <option value="12v">12V</option>
              <option value="24v">24V</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Part Number
            </label>
            <input
              type="text"
              name="partNo"
              value={product.partNo}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#133E87] focus:border-[#133E87]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Color
            </label>
            <input
              type="color"
              name="color"
              value={product.color}
              onChange={handleChange}
              className="mt-1 block w-32 h-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-[#133E87] focus:border-[#133E87]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Stock Status
            </label>
            <select
              name="stock"
              value={product.stock}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#133E87] focus:border-[#133E87]"
              required
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#133E87] focus:border-[#133E87]"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-[#133E87] text-white px-4 py-2 rounded-md hover:bg-[#0E2E5F]"
            >
              Add Product
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default AddProductPage;