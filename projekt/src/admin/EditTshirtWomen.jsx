import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditTshirtWomen = () => {
  const [tshirtWomen, setTshirtWomen] = useState({
    name: "",
    price: "",
    cover: null,
    preview: null, // Preview image
  });

  const navigate = useNavigate();
  const location = useLocation();
  const tshirtwomenId = location.pathname.split("/")[2];

  // Fetch existing T-shirt data
  useEffect(() => {
    const fetchTshirtWomen = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/tshirtwomen/${tshirtwomenId}`);
        setTshirtWomen({
          name: res.data.name,
          price: res.data.price,
          cover: res.data.cover, // Store the image path
          preview: res.data.cover ? `http://localhost:3002${res.data.cover}` : null, // Set preview
        });
      } catch (err) {
        console.log("Error fetching T-shirt:", err);
      }
    };
    fetchTshirtWomen();
  }, [tshirtwomenId]);

  // Handle text inputs
  const handleChange = (e) => {
    setTshirtWomen((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTshirtWomen((prev) => ({
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
    formData.append("name", tshirtWomen.name);
    formData.append("price", tshirtWomen.price);
    if (tshirtWomen.cover instanceof File) {
      formData.append("cover", tshirtWomen.cover); // Append new file if changed
    }

    try {
      await axios.put(`http://localhost:3002/tshirtwomen/${tshirtwomenId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/tshirt-women");
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
                  value={tshirtWomen.name || ""}
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
                  value={tshirtWomen.price || ""}
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
                {tshirtWomen.preview && (
                  <img
                    src={tshirtWomen.preview}
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

export default EditTshirtWomen;
