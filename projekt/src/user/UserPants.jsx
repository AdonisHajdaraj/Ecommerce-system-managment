import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import USidebar from './UserSidebar';

const UserPants = () => {
    const [pants, setPants] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [sortOption, setSortOption] = useState('');

    useEffect(() => {
        const fetchAllPants = async () => {
            try {
                const res = await axios.get("http://localhost:3002/pants");
                setPants(res.data);
                setFiltered(res.data); // Fillon me të gjitha të dhënat
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllPants();
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

    const handleAddToCart = (pant) => {
        // Logika për të shtuar Shoe në karrocë
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        const newItem = {
            id: pant.id,
            name: pant.name,
            price: pant.price,
            image: pant.cover,
            quantity: 1,
            size: 46,
            type: 'pants'
        };

        cart.push(newItem);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`✅ "${pant.name}" u shtua në shportë!`);
    };

    

    return (
        <div className="d-flex min-vh-100" style={{ backgroundColor: '#F0F0F0' }}>
            <USidebar /> 

            <div className="container mt-4">
                <h1 className="mb-4 text-center">Pants For Men</h1>
                
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
                    {filtered.map(pant => (
                        <div key={pant.id} className="col-md-4 mb-4">
                            <div className="card shadow-sm p-3 text-center">
                                {pant.cover && (
                                    <img
                                        src={`http://localhost:3002${pant.cover}`}
                                        alt={pant.name}
                                        className="card-img-top"
                                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                    />
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">{pant.name}</h5>
                                    <p className="card-text">${pant.price}</p>

                                    {/* Butonat për "Add to Cart" dhe "Order Now" */}
                                    <div className="d-flex justify-content-center gap-2 mt-3">
                                        <button
                                            className="btn btn-outline-primary btn-sm"
                                            onClick={() => handleAddToCart(pant)}
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

export default UserPants;
