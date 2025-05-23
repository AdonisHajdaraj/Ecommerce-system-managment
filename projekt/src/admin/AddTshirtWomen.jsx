import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddTshirtWomen = () => {
  const [tshirtWomen, setTshirtWomen] = useState({
    name: "",
    price: "",
    cover: null,
    preview: null, // For image preview
  });

  const navigate = useNavigate();

  // Handle text input change
  const handleChange = (e) => {
    setTshirtWomen(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Handle file selection and image preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTshirtWomen(prev => ({
        ...prev,
        cover: file,
        preview: URL.createObjectURL(file), // Show preview of selected image
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", tshirtWomen.name);
    formData.append("price", tshirtWomen.price);
    formData.append("cover", tshirtWomen.cover);

    try {
      await axios.post("http://localhost:3002/tshirtwomen", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      navigate("/tshirt-women");
    } catch (err) {
      console.error("Error adding T-shirt:", err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card border-light shadow-lg rounded-3 p-4">
            <h3 className="text-center text-primary mb-4">Add New T-Shirt</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">T-Shirt Name</label>
                <input
                  type="text"
                  className="form-control border-0 shadow-sm"
                  placeholder="Enter name"
                  name="name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Price ($)</label>
                <input
                  type="number"
                  className="form-control border-0 shadow-sm"
                  placeholder="Enter price"
                  name="price"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control border-0 shadow-sm"
                  onChange={handleFileChange}
                  required
                />
                {tshirtWomen.preview && (
                  <img
                    src={tshirtWomen.preview}
                    alt="Preview"
                    className="mt-3 rounded"
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                  />
                )}
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary shadow-sm px-4 py-2">
                  Add T-Shirt
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTshirtWomen;
