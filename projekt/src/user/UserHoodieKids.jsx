import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import USidebar from './UserSidebar';

const UserHoodieKids = () => {
    const [hoodiesKids, setHoodiesKids] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [sortOption, setSortOption] = useState('');

    useEffect(() => {
        const fetchAllHoodiesKids = async () => {
            try {
                const res = await axios.get("http://localhost:3002/hoodiekids");
                setHoodiesKids(res.data);
                setFiltered(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllHoodiesKids();
    }, []);

    useEffect(() => {
        let sorted = [...filtered];
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
    }, [sortOption]);

    const handleAddToCart = (hoodieKids) => {
        // Logika për të shtuar Shoe në karrocë
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        const newItem = {
            id: hoodieKids.id,
            name: hoodieKids.name,
            price: hoodieKids.price,
            image: hoodieKids.cover,
            quantity: 1,
            size: 'XS',
            type: 'hoodiekids'
        };

        cart.push(newItem);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`✅ "${hoodieKids.name}" u shtua në shportë!`);
    };

    return (
        <div className="d-flex min-vh-100" style={{ backgroundColor: '#F0F0F0' }}>
            <USidebar />

            <div className="container mt-4">
                <h1 className="mb-4 text-center">Hoodies for Kids</h1>

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
                    {filtered.map(hoodieKids => (
                        <div key={hoodieKids.id} className="col-md-4 mb-4">
                            <div className="card shadow-sm p-3 text-center">
                                {hoodieKids.cover && (
                                    <img
                                        src={`http://localhost:3002${hoodieKids.cover}`}
                                        alt={hoodieKids.name}
                                        className="card-img-top"
                                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                    />
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">{hoodieKids.name}</h5>
                                    <p className="card-text">${hoodieKids.price}</p>

                                    <div className="d-flex justify-content-center gap-2 mt-3">
                                        <button
                                            className="btn btn-outline-primary btn-sm"
                                            onClick={() => handleAddToCart(hoodieKids)}
                                        >
                                            🛒 Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserHoodieKids;
