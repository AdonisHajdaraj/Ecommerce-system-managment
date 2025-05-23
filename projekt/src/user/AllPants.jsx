import React, { useEffect, useState } from 'react';
import USidebar from './UserSidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const AllPants = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [sortOption, setSortOption] = useState(''); // '', 'price-low-to-high', 'price-high-to-low'

  useEffect(() => {
    const fetchAllClothing = async () => {
      try {
        const [menResPants, womenResPants, kidsResPants] = await Promise.all([
          axios.get('http://localhost:3002/pants'),
          axios.get('http://localhost:3002/pantswomen'),
          axios.get('http://localhost:3002/pantskids'),
        ]);
        const menWithTypePants = menResPants.data.map(item => ({ ...item, type: 'pants' }));
        const womenWithTypePants = womenResPants.data.map(item => ({ ...item, type: 'pantswomen' }));
        const kidsWithTypePants = kidsResPants.data.map(item => ({ ...item, type: 'pantskids' }));

        const allProducts = [...menWithTypePants, ...womenWithTypePants, ...kidsWithTypePants];
        const shuffled = allProducts.sort(() => Math.random() - 0.5);

        setProducts(shuffled);
        setFiltered(shuffled);
      } catch (error) {
        console.error('Gabim gjatë fetch:', error);
      }
    };

    fetchAllClothing();
  }, []);

  // Vetëm sortim sipas çmimit, nuk ka filter sipas type
  useEffect(() => {
    let sorted = [...products];
    switch (sortOption) {
      case 'price-low-to-high':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-to-low':
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    setFiltered(sorted);
  }, [sortOption, products]);

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
        <h1 className="mb-4 text-center">Pants Collection</h1>

        <div className="d-flex justify-content-center mb-4">
          {/* Vetëm dropdown për sortim sipas çmimit */}
          <select
            className="form-select w-25 shadow rounded-pill text-center"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">⚙️ Filtro sipas Çmimit</option>
            <option value="price-low-to-high">💲 Çmimi nga i ulëti në të lartin</option>
            <option value="price-high-to-low">💲 Çmimi nga i larti në të ulët</option>
          </select>
        </div>

        <div className="row">
          {filtered.map(item => (
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
          ))}
          {filtered.length === 0 && (
            <p className="text-center">Nuk u gjet asnjë produkt.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllPants;
