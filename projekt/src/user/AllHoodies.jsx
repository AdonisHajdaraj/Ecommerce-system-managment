import React, { useEffect, useState } from 'react';
import USidebar from './UserSidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const AllHoodies = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterOption, setFilterOption] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAllClothing = async () => {
      try {
        const [menResHoodie, womenResHoodie, kidsResHoodie] = await Promise.all([
          axios.get('http://localhost:3002/hoodie'),
          axios.get('http://localhost:3002/hoodiewomen'),
          axios.get('http://localhost:3002/hoodiekids'),
        ]);

        const menWithTypeHoodie = menResHoodie.data.map(item => ({ ...item, type: 'hoodie' }));
        const womenWithTypeHoodie = womenResHoodie.data.map(item => ({ ...item, type: 'hoodiewomen' }));
        const kidsWithTypeHoodie = kidsResHoodie.data.map(item => ({ ...item, type: 'hoodiekids' }));

        const allProducts = [...menWithTypeHoodie, ...womenWithTypeHoodie, ...kidsWithTypeHoodie];
        const shuffled = allProducts.sort(() => Math.random() - 0.5);

        setProducts(shuffled);
        setFiltered(shuffled);
      } catch (error) {
        console.error('Gabim gjatë fetch:', error);
      }
    };

    fetchAllClothing();
  }, []);

  useEffect(() => {
    let temp = [...products];

    // Filtrim sipas search (emrit)
    if (searchTerm.trim() !== '') {
      const lowerSearch = searchTerm.toLowerCase();
      temp = temp.filter(item => item.name.toLowerCase().includes(lowerSearch));
    }

    // Filtrim sipas kategori + sortim nga filterOption
    const categories = ['hoodie', 'hoodiewomen', 'hoodiekids'];
    if (categories.includes(filterOption)) {
      temp = temp.filter(item => item.type === filterOption);
    }

    if (filterOption === 'price-low-to-high') {
      temp.sort((a, b) => a.price - b.price);
    } else if (filterOption === 'price-high-to-low') {
      temp.sort((a, b) => b.price - a.price);
    }

    setFiltered(temp);
  }, [filterOption, searchTerm, products]);

  const handleAddToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const newItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.cover,
      quantity: 1,
      size: '',
      type: item.type,
    };

    cart.push(newItem);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`✅ "${item.name}" u shtua në shportë!`);
  };

  return (
    <div className="d-flex min-vh-100" style={{ backgroundColor: '#F0F0F0' }}>
      <USidebar />

      <div className="container mt-4">
        <h1 className="mb-4 text-center">Hoodies Collection</h1>

        <div className="d-flex justify-content-center mb-4 gap-3 flex-wrap">
          {/* Dropdown i vetëm për kategori dhe sortim */}
          <select
            className="form-select w-auto shadow rounded-pill text-center"
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value)}
          >
            <option value="">📂 Të gjitha kategoritë</option>
            <option value="hoodie">🧑 Meshkuj</option>
            <option value="hoodiewomen">👩 Femra</option>
            <option value="hoodiekids">👶 Fëmijë</option>
            <option value="price-low-to-high">💲 Çmimi nga i ulëti në të lartin</option>
            <option value="price-high-to-low">💲 Çmimi nga i larti në të ulët</option>
          </select>

          {/* Input për kërkim */}
          <input
            type="text"
            className="form-control w-auto shadow rounded-pill text-center"
            placeholder="🔍 Kërko sipas emrit"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ maxWidth: '250px' }}
          />
        </div>

        <div className="row">
          {filtered.length === 0 ? (
            <p className="text-center">Nuk u gjet asnjë produkt.</p>
          ) : (
            filtered.map(item => (
              <div key={`${item.type}-${item.id}`} className="col-md-4 mb-4">
                <div className="card shadow-sm p-3 text-center">
                  {item.cover && (
                    <img
                      src={`http://localhost:3002${item.cover}`}
                      alt={item.name}
                      className="card-img-top"
                      style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">${item.price}</p>

                    <div className="d-flex justify-content-center gap-2 mt-3">
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => handleAddToCart(item)}
                      >
                        🛒 Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AllHoodies;
