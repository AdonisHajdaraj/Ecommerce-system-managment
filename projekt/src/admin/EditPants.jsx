import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditPants = () => {
  const [pants, setPants] = useState({
    name: "",
    price: "",
    cover: null,
    preview: null,
  });

  const navigate = useNavigate();
  const location = useLocation();
  const pantsId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchPants = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/pants/${pantsId}`);
        setPants({
          name: res.data.name,
          price: res.data.price,
          cover: res.data.cover,
          preview: res.data.cover ? `http://localhost:3002${res.data.cover}` : null,
        });
      } catch (err) {
        console.log("Error fetching pants:", err);
      }
    };
    fetchPants();
  }, [pantsId]);

  const handleChange = (e) => {
    setPants(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPants(prev => ({
        ...prev,
        cover: file,
        preview: URL.createObjectURL(file),
      }));
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", pants.name);
    formData.append("price", pants.price);
    if (pants.cover instanceof File) {
      formData.append("cover", pants.cover);
    }

    try {
      await axios.put(`http://localhost:3002/pants/${pantsId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/pants-men");
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
                  value={pants.name || ""}
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
                  value={pants.price || ""}
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
                {pants.preview && (
                  <img
                    src={pants.preview}
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

export default EditPants;
