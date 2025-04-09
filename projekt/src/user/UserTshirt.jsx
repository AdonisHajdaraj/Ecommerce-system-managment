import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import USidebar from './UserSidebar';

const UserTshirt = () => {
    const [tshirts, setTshirts] = useState([]);

    useEffect(() => {
        const fetchAllTshirts = async () => {
            try {
                const res = await axios.get("http://localhost:3002/tshirt");
                setTshirts(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllTshirts();
    }, []);

    return (
        <div className="d-flex"> 
            <USidebar /> 

            <div className="container mt-4">
                <h1 className="mb-4 text-center">T-Shirts Collection</h1>
                <div className="row">
                    {tshirts.map(tshirt => (
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
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserTshirt;