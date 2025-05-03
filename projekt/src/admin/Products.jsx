import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Sidebar';

function Products() {
  const [produktet, setProduktet] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    fetch('http://localhost:3002/produktet')
      .then(res => res.json())
      .then(data => {
        setProduktet(data);
        setFiltered(data);
      });
  }, []);

  useEffect(() => {
    let sorted = [...produktet];
    switch (sortOption) {
      case 'name':
        sorted.sort((a, b) => a.lloji.localeCompare(b.lloji));
        break;
      case 'category':
        sorted.sort((a, b) => a.kategoria.localeCompare(b.kategoria));
        break;
      default:
        break;
    }
    setFiltered(sorted);
  }, [sortOption, produktet]);

  return (
    <div className="container-fluid py-5">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="col-md-9">
          <h2 className="mb-4 text-center">🛍️ Llojet e Produkteve</h2>

          {/* Dropdown Filter */}
          <div className="mb-4 d-flex justify-content-center">
            <select
              className="form-select w-50 shadow rounded-pill text-center"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">⚙️ Filtro sipas</option>
              <option value="name">📛 Emri</option>
              <option value="category">📂 Kategoria</option>
            </select>
          </div>

          {/* Produktet */}
          <div className="row">
            {filtered.map((produkt) => (
              <div key={produkt.id} className="col-md-4 mb-4">
                <div className="card shadow-sm h-100 border-0">
                  <img
                    src={`http://localhost:3002/uploads/${produkt.cover}`}
                    alt={produkt.lloji}
                    className="card-img-top"
                    style={{ height: '250px', objectFit: 'cover' }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title text-primary">{produkt.lloji}</h5>
                    <p className="card-text text-muted">{produkt.kategoria}</p>
                    
                    {/* Buttons */}
                    <div className="d-flex justify-content-center gap-2 mt-3">
                      <button className="btn btn-outline-primary btn-sm">
                        🛒 Add to Cart
                      </button>
                      <button className="btn btn-success btn-sm">
                        📦 Order Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Products;
