import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import USidebar from './UserSidebar';

const UserBag = () => {
    const [bags, setBags] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [sortOption, setSortOption] = useState('');

    useEffect(() => {
        const fetchAllBags = async () => {
            try {
                const res = await axios.get("http://localhost:3002/bag");
                setBags(res.data);
                setFiltered(res.data); // Fillon me të gjitha të dhënat
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllBags();
    }, []);

    useEffect(() => {
        let sorted = [...filtered];
        switch (sortOption) {
            case 'price-low-to-high':
                sorted.sort((a, b) => a.price - b.price); // Çmimi nga më i ulëti në më të lartin
                break;
            case 'price-high-to-low':
                sorted.sort((a, b) => b.price - a.price); // Çmimi nga më i larti në më të ulët
                break;
            default:
                break;
        }
        setFiltered(sorted);
    }, [sortOption]);

    const handleAddToCart = (bag) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        const newItem = {
            id: bag.id,
            name: bag.name,
            price: bag.price,
            image: bag.cover,
            quantity: 1,
            size: "-",
            type: 'bag'
        };

        cart.push(newItem);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`✅ "${bag.name}" u shtua në shportë!`);
    };

    

    return (
        <div className="d-flex min-vh-100" style={{ backgroundColor: '#C0C0C0' }}>
            <USidebar /> 

            <div className="container mt-4">
                <h1 className="mb-4 text-center">Bag Collection</h1>
                
                {/* Styled Dropdown for sorting */}
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
                    {filtered.map(bag => (
                        <div key={bag.id} className="col-md-4 mb-4">
                            <div className="card shadow-sm p-3 text-center">
                                {bag.cover && (
                                    <img
                                        src={`http://localhost:3002${bag.cover}`}
                                        alt={bag.name}
                                        className="card-img-top"
                                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                    />
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">{bag.name}</h5>
                                    <p className="card-text">${bag.price}</p>

                                    {/* Butonat për "Add to Cart" dhe "Order Now" */}
                                    <div className="d-flex justify-content-center gap-2 mt-3">
                                        <button
                                            className="btn btn-outline-primary btn-sm"
                                            onClick={() => handleAddToCart(bag)}
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

export default UserBag;
