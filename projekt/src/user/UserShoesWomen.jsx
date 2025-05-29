import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import USidebar from './UserSidebar';

const UserShoesWomen = () => {
    const [shoesWomen, setShoesWomen] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const [searchTerm, setSearchTerm] = useState(''); // ✅ Shtojmë searchTerm

    useEffect(() => {
        const fetchAllShoesWomen = async () => {
            try {
                const res = await axios.get("http://localhost:3002/shoewomen");
                setShoesWomen(res.data);
                setFiltered(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllShoesWomen();
    }, []);

    useEffect(() => {
        let filteredData = shoesWomen;

        if (searchTerm.trim() !== '') {
            filteredData = filteredData.filter((shoe) =>
                shoe.name.toLowerCase().includes(searchTerm.toLowerCase())
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
    }, [searchTerm, sortOption, shoesWomen]);

    const handleAddToCart = (shoeWomen) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        const newItem = {
            id: shoeWomen.id,
            name: shoeWomen.name,
            price: shoeWomen.price,
            image: shoeWomen.cover,
            quantity: 1,
            size: 36,
            type: 'shoewomen'
        };

        cart.push(newItem);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`✅ "${shoeWomen.name}" u shtua në shportë!`);
    };

    return (
        <div className="d-flex min-vh-100" style={{ backgroundColor: '#F0F0F0' }}>
            <USidebar />

            <div className="container mt-4">
                <h1 className="mb-4 text-center">Shoes For Women</h1>

                {/* 🔍 Input kërkimi */}
                <div className="mb-4 d-flex justify-content-center">
                    <input
                        type="text"
                        className="form-control w-50 shadow-sm rounded-pill text-center"
                        placeholder="🔍 Kërko këpucë për gra..."
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
                        <p className="text-center">❌ Nuk u gjetën këpucë që përputhen me kërkimin.</p>
                    ) : (
                        filtered.map(shoeWomen => (
                            <div key={shoeWomen.id} className="col-md-4 mb-4">
                                <div className="card shadow-sm p-3 text-center">
                                    {shoeWomen.cover && (
                                        <img
                                            src={`http://localhost:3002${shoeWomen.cover}`}
                                            alt={shoeWomen.name}
                                            className="card-img-top"
                                            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                        />
                                    )}
                                    <div className="card-body">
                                        <h5 className="card-title">{shoeWomen.name}</h5>
                                        <p className="card-text">${shoeWomen.price}</p>

                                        <div className="d-flex justify-content-center gap-2 mt-3">
                                            <button
                                                className="btn btn-outline-primary btn-sm"
                                                onClick={() => handleAddToCart(shoeWomen)}
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

export default UserShoesWomen;
