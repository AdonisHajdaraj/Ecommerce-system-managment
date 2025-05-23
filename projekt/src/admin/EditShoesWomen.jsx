import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditShoesWomen = () => {
  const [shoesWomen, setShoesWomen] = useState({
    name: "",
    price: "",
    cover: null,
    preview: null,
  });

  const navigate = useNavigate();
  const location = useLocation();
  const shoeswomenId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchShoesWomen = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/shoewomen/${shoeswomenId}`);
        setShoesWomen({
          name: res.data.name,
          price: res.data.price,
          cover: res.data.cover,
          preview: res.data.cover ? `http://localhost:3002${res.data.cover}` : null,
        });
      } catch (err) {
        console.log("Error fetching shoes:", err);
      }
    };
    fetchShoesWomen();
  }, [shoeswomenId]);

  const handleChange = (e) => {
    setShoesWomen(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setShoesWomen(prev => ({
        ...prev,
        cover: file,
        preview: URL.createObjectURL(file),
      }));
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", shoesWomen.name);
    formData.append("price", shoesWomen.price);
    if (shoesWomen.cover instanceof File) {
      formData.append("cover", shoesWomen.cover);
    }

    try {
      await axios.put(`http://localhost:3002/shoewomen/${shoeswomenId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/shoes-women");
    } catch (err) {
      console.log("Error updating shoes:", err);
    }
  };

  return (
    <div className='container mt-5'>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card border-light rounded-3 shadow-lg p-4">
            <h3 className="text-center text-dark mb-4">Edit Shoes</h3>
            <form>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control form-control-lg border-0 shadow-sm"
                  placeholder="Enter name"
                  name="name"
                  onChange={handleChange}
                  value={shoesWomen.name || ""}
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
                  value={shoesWomen.price || ""}
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
                {shoesWomen.preview && (
                  <img
                    src={shoesWomen.preview}
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
                  Update Shoes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditShoesWomen;
