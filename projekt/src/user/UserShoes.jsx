import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import USidebar from './UserSidebar';

const UserShoes = () => {
    const [shoes, setShoes] = useState([]);

    useEffect(() => {
        const fetchAllShoes = async () => {
            try {
                const res = await axios.get("http://localhost:3002/shoes");
                setShoes(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllShoes();
    }, []);

    return (
        <div className="d-flex"> 
            <USidebar /> 

            <div className="container mt-4">
                <h1 className="mb-4 text-center">Shoes Collection</h1>
                <div className="row">
                    {shoes.map(shoe => (
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
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserShoes;
