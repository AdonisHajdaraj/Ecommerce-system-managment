import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import USidebar from './UserSidebar';

const UserTshirt = () => {
    const [tshirts, setTshirts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const [searchTerm, setSearchTerm] = useState(''); // ✅ shtuar

    useEffect(() => {
        const fetchAllTshirts = async () => {
            try {
                const res = await axios.get("http://localhost:3002/tshirt");
                setTshirts(res.data);
                setFiltered(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllTshirts();
    }, []);

    useEffect(() => {
        let filteredData = [...tshirts];

        if (searchTerm.trim() !== '') {
            filteredData = filteredData.filter(t =>
                t.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

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
    }, [searchTerm, sortOption, tshirts]);

    const handleAddToCart = (tshirt) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        const newItem = {
            id: tshirt.id,
            name: tshirt.name,
            price: tshirt.price,
            image: tshirt.cover,
            quantity: 1,
            size: 'M',
            type: 'tshirt'
        };

        cart.push(newItem);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`✅ "${tshirt.name}" u shtua në shportë!`);
    };

    return (
        <div className="d-flex min-vh-100" style={{ backgroundColor: '#F0F0F0' }}>
            <USidebar />

            <div className="container mt-4">
                <h1 className="mb-4 text-center">T-Shirts for Men</h1>

                {/* 🔍 Input kërkimi */}
                <div className="mb-4 d-flex justify-content-center">
                    <input
                        type="text"
                        className="form-control w-50 shadow-sm rounded-pill text-center"
                        placeholder="🔍 Kërko t-shirt..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Dropdown i filtrimit sipas çmimit */}
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
                        <p className="text-center">❌ Nuk u gjetën t-shirt që përputhen me kërkimin.</p>
                    ) : (
                        filtered.map(tshirt => (
                            <div key={tshirt.id} className="col-md-4 mb-4">
                                <div className="card shadow-sm p-3 text-center">
                                    {tshirt.cover && (
                                        <img
                                            src={`http://localhost:3002${tshirt.cover}`}
                                            alt={tshirt.name}
                                            className="card-img-top"
                                            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                        />
                                    )}
                                    <div className="card-body">
                                        <h5 className="card-title">{tshirt.name}</h5>
                                        <p className="card-text">${tshirt.price}</p>
                                        <div className="d-flex justify-content-center gap-2 mt-3">
                                            <button
                                                className="btn btn-outline-primary btn-sm"
                                                onClick={() => handleAddToCart(tshirt)}
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

export default UserTshirt;
