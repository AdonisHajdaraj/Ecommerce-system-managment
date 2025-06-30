import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddHat = () => {
  const [hats, setHats] = useState({
    name: "",
    price: "",
    cover: null,
    preview: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setHats(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHats(prev => ({
        ...prev,
        cover: file,
        preview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", hats.name);
    formData.append("price", hats.price);
    formData.append("cover", hats.cover);

    try {
      await axios.post("http://localhost:3002/hat", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      navigate("/hat");
    } catch (err) {
      console.error("Error adding hat:", err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card border-light shadow-lg rounded-3 p-4">
            <h3 className="text-center text-primary mb-4">Add New Hat</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Hat Name</label>
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
                {hats.preview && (
                  <img
                    src={hats.preview}
                    alt="Preview"
                    className="mt-3 rounded"
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                  />
                )}
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary shadow-sm px-4 py-2">
                  Add Hat
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHat;
