import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import USidebar from './UserSidebar';

const UserBag = () => {
    const [bag, setBag] = useState([]);

    useEffect(() => {
        const fetchAllBag = async () => {
            try {
                const res = await axios.get("http://localhost:3002/bag");
                setBag(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllBag();
    }, []);
    
    return (
        <div className="d-flex" style={{ backgroundColor: '#C0C0C0' }}>
            <USidebar /> 

            <div className="container mt-4">
                <h1 className="mb-4 text-center">Bag Collection</h1>
                <div className="row">
                    {bag.map(bag => (
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
