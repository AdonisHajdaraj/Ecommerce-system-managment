import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditTshirt = () => {
  const [tshirt, setTshirt] = useState({
    name: "",
    price: "",
    cover: null,
    preview: null, // Preview image
  });

  const navigate = useNavigate();
  const location = useLocation();
  const tshirtId = location.pathname.split("/")[2];

  // Fetch existing T-shirt data
  useEffect(() => {
    const fetchTshirt = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/tshirt/${tshirtId}`);
        setTshirt({
          name: res.data.name,
          price: res.data.price,
          cover: res.data.cover, // Store the image path
          preview: res.data.cover ? `http://localhost:3002${res.data.cover}` : null, // Set preview
        });
      } catch (err) {
        console.log("Error fetching T-shirt:", err);
      }
    };
    fetchTshirt();
  }, [tshirtId]);

  // Handle text inputs
  const handleChange = (e) => {
    setTshirt((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTshirt((prev) => ({
        ...prev,
        cover: file,
        preview: URL.createObjectURL(file), // Show preview of new image
      }));
    }
  };

  // Handle form submission
  const handleClick = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", tshirt.name);
    formData.append("price", tshirt.price);
    if (tshirt.cover instanceof File) {
      formData.append("cover", tshirt.cover); // Append new file if changed
    }

    try {
      await axios.put(`http://localhost:3002/tshirt/${tshirtId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/tshirt");
    } catch (err) {
      console.log("Error updating T-shirt:", err);
    }
  };

  return (
    <div className='container mt-5'>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card border-light rounded-3 shadow-lg p-4">
            <h3 className="text-center text-dark mb-4">Edit T-Shirt</h3>
            <form>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control form-control-lg border-0 shadow-sm"
                  placeholder="Enter name"
                  name="name"
                  onChange={handleChange}
                  value={tshirt.name || ""}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  className="form-control form-control-lg border-0 shadow-sm"
                  placeholder="Enter price"
                  name="price"
                  onChange={handleChange}
                  value={tshirt.price || ""}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control form-control-lg border-0 shadow-sm"
                  onChange={handleFileChange}
                />
                {tshirt.preview && (
                  <img
                    src={tshirt.preview}
                    alt="Preview"
                    className="mt-3"
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                  />
                )}
              </div>
              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-outline-primary px-4 py-2 shadow-sm"
                  onClick={handleClick}
                >
                  Update T-Shirt
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTshirt;
