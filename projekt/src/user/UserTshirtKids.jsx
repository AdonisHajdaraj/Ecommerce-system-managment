import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import USidebar from './UserSidebar';

const UserTshirtKids = () => {
    const [tshirtsKids, setTshirtsKids] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const [searchTerm, setSearchTerm] = useState(''); // ✅ shtuar

    useEffect(() => {
        const fetchAllTshirtsKids = async () => {
            try {
                const res = await axios.get("http://localhost:3002/tshirtkids");
                setTshirtsKids(res.data);
                setFiltered(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllTshirtsKids();
    }, []);

    useEffect(() => {
        let filteredData = [...tshirtsKids];

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
    }, [searchTerm, sortOption, tshirtsKids]);

    const handleAddToCart = (tshirtKids) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        const newItem = {
            id: tshirtKids.id,
            name: tshirtKids.name,
            price: tshirtKids.price,
            image: tshirtKids.cover,
            quantity: 1,
            size: 'XS',
            type: 'tshirtkids'
        };

        cart.push(newItem);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`✅ "${tshirtKids.name}" u shtua në shportë!`);
    };

    return (
        <div className="d-flex min-vh-100" style={{ backgroundColor: '#F0F0F0' }}>
            <USidebar />

            <div className="container mt-4">
                <h1 className="mb-4 text-center">T-Shirts for Kids</h1>

                {/* 🔍 Input kërkimi */}
                <div className="mb-3 d-flex justify-content-center">
                    <input
                        type="text"
                        className="form-control w-50 shadow-sm rounded-pill text-center"
                        placeholder="🔍 Kërko t-shirt për fëmijë..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Filtro sipas çmimit */}
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
                        <p className="text-center">❌ Nuk u gjetën produkte që përputhen me kërkimin.</p>
                    ) : (
                        filtered.map(tshirtKids => (
                            <div key={tshirtKids.id} className="col-md-4 mb-4">
                                <div className="card shadow-sm p-3 text-center">
                                    {tshirtKids.cover && (
                                        <img
                                            src={`http://localhost:3002${tshirtKids.cover}`}
                                            alt={tshirtKids.name}
                                            className="card-img-top"
                                            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                        />
                                    )}
                                    <div className="card-body">
                                        <h5 className="card-title">{tshirtKids.name}</h5>
                                        <p className="card-text">${tshirtKids.price}</p>
                                        <div className="d-flex justify-content-center gap-2 mt-3">
                                            <button
                                                className="btn btn-outline-primary btn-sm"
                                                onClick={() => handleAddToCart(tshirtKids)}
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

export default UserTshirtKids;
