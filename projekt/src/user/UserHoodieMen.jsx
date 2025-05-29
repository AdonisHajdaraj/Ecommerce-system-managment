import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import USidebar from './UserSidebar';

const UserHoodieMen = () => {
    const [hoodies, setHoodies] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const [searchTerm, setSearchTerm] = useState('');  // Search term

    useEffect(() => {
        const fetchAllHoodies = async () => {
            try {
                const res = await axios.get("http://localhost:3002/hoodie");
                setHoodies(res.data);
                setFiltered(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllHoodies();
    }, []);

    useEffect(() => {
        let filteredData = [...hoodies];

        // Filter by search term
        if (searchTerm.trim() !== '') {
            filteredData = filteredData.filter(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Sort by price
        switch (sortOption) {
            case 'price-low-to-high':
                filteredData.sort((a, b) => a.price - b.price);
                break;
            case 'price-high-to-low':
                filteredData.sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }

        setFiltered(filteredData);
    }, [searchTerm, sortOption, hoodies]);

    const handleAddToCart = (hoodie) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        const newItem = {
            id: hoodie.id,
            name: hoodie.name,
            price: hoodie.price,
            image: hoodie.cover,
            quantity: 1,
            size: 'M',
            type: 'hoodie'
        };

        cart.push(newItem);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`✅ "${hoodie.name}" u shtua në shportë!`);
    };

    return (
        <div className="d-flex min-vh-100" style={{ backgroundColor: '#F0F0F0' }}>
            <USidebar />

            <div className="container mt-4">
                <h1 className="mb-4 text-center">Hoodies for Men</h1>

                {/* Search bar */}
                <div className="mb-3 d-flex justify-content-center">
                    <input
                        type="text"
                        className="form-control w-50 shadow-sm rounded-pill text-center"
                        placeholder="🔍 Kërko hoodies për meshkuj..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Sorting dropdown */}
                <div className="mb-4 d-flex justify-content-center">
                    <select
                        className="form-select w-50 shadow rounded-pill text-center"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                    >
                        <option value="">⚙️ Filtro sipas Çmimit</option>
                        <option value="price-low-to-high">💲 Çmimi nga i ulëti në të lartin</option>
                        <option value="price-high-to-low">💲 Çmimi nga i larti në të ulët</option>
                    </select>
                </div>

                <div className="row">
                    {filtered.length === 0 ? (
                        <p className="text-center">❌ Nuk u gjetën hoodies që përputhen me kërkimin.</p>
                    ) : (
                        filtered.map(hoodie => (
                            <div key={hoodie.id} className="col-md-4 mb-4">
                                <div className="card shadow-sm p-3 text-center">
                                    {hoodie.cover && (
                                        <img
                                            src={`http://localhost:3002${hoodie.cover}`}
                                            alt={hoodie.name}
                                            className="card-img-top"
                                            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                        />
                                    )}
                                    <div className="card-body">
                                        <h5 className="card-title">{hoodie.name}</h5>
                                        <p className="card-text">${hoodie.price}</p>

                                        <div className="d-flex justify-content-center gap-2 mt-3">
                                            <button
                                                className="btn btn-outline-primary btn-sm"
                                                onClick={() => handleAddToCart(hoodie)}
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

export default UserHoodieMen;
