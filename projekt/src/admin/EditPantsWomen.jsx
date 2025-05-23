import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditPantsWomen = () => {
  const [pantsWomen, setPantsWomen] = useState({
    name: "",
    price: "",
    cover: null,
    preview: null,
  });

  const navigate = useNavigate();
  const location = useLocation();
  const pantswomenId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchPantsWomen = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/pantswomen/${pantswomenId}`);
        setPantsWomen({
          name: res.data.name,
          price: res.data.price,
          cover: res.data.cover,
          preview: res.data.cover ? `http://localhost:3002${res.data.cover}` : null,
        });
      } catch (err) {
        console.log("Error fetching pants:", err);
      }
    };
    fetchPantsWomen();
  }, [pantswomenId]);

  const handleChange = (e) => {
    setPantsWomen(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPantsWomen(prev => ({
        ...prev,
        cover: file,
        preview: URL.createObjectURL(file),
      }));
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", pantsWomen.name);
    formData.append("price", pantsWomen.price);
    if (pantsWomen.cover instanceof File) {
      formData.append("cover", pantsWomen.cover);
    }

    try {
      await axios.put(`http://localhost:3002/pantswomen/${pantswomenId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/pants-women");
    } catch (err) {
      console.log("Error updating pants:", err);
    }
  };

  return (
    <div className='container mt-5'>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card border-light rounded-3 shadow-lg p-4">
            <h3 className="text-center text-dark mb-4">Edit Pants</h3>
            <form>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control form-control-lg border-0 shadow-sm"
                  placeholder="Enter name"
                  name="name"
                  onChange={handleChange}
                  value={pantsWomen.name || ""}
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
                  value={pantsWomen.price || ""}
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
                {pantsWomen.preview && (
                  <img
                    src={pantsWomen.preview}
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
                  Update Pants
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPantsWomen;
