import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import USidebar from './UserSidebar';

const UserShoes = () => {
    const [shoes, setShoes] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const [searchTerm, setSearchTerm] = useState(''); // ✅ Kërkimi

    useEffect(() => {
        const fetchAllShoes = async () => {
            try {
                const res = await axios.get("http://localhost:3002/shoes");
                setShoes(res.data);
                setFiltered(res.data); // Fillon me të gjitha të dhënat
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllShoes();
    }, []);

    // Filter dhe sortim
    useEffect(() => {
        let filteredData = shoes;

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
    }, [searchTerm, sortOption, shoes]);

    const handleAddToCart = (shoe) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        const newItem = {
            id: shoe.id,
            name: shoe.name,
            price: shoe.price,
            image: shoe.cover,
            quantity: 1,
            size: 36,
            type: 'shoe'
        };

        cart.push(newItem);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`✅ "${shoe.name}" u shtua në shportë!`);
    };

    return (
        <div className="d-flex min-vh-100" style={{ backgroundColor: '#F0F0F0' }}>
            <USidebar />

            <div className="container mt-4">
                <h1 className="mb-4 text-center">Shoes For Men</h1>

                {/* 🔍 Input për search */}
                <div className="mb-4 d-flex justify-content-center">
                    <input
                        type="text"
                        className="form-control w-50 shadow-sm rounded-pill text-center"
                        placeholder="🔍 Kërko këpucë..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Dropdown për sorting */}
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
                        <p className="text-center">❌ Nuk u gjetën rezultate.</p>
                    ) : (
                        filtered.map(shoe => (
                            <div key={shoe.id} className="col-md-4 mb-4">
                                <div className="card shadow-sm p-3 text-center">
                                    {shoe.cover && (
                                        <img
                                            src={`http://localhost:3002${shoe.cover}`}
                                            alt={shoe.name}
                                            className="card-img-top"
                                            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                        />
                                    )}
                                    <div className="card-body">
                                        <h5 className="card-title">{shoe.name}</h5>
                                        <p className="card-text">${shoe.price}</p>

                                        <div className="d-flex justify-content-center gap-2 mt-3">
                                            <button
                                                className="btn btn-outline-primary btn-sm"
                                                onClick={() => handleAddToCart(shoe)}
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

export default UserShoes;
