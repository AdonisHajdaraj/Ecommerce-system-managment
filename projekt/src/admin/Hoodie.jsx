import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Sidebar';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Hoodie = () => {
    const [hoodies, setHoodies] = useState([]);

    useEffect(() => {
        const fetchAllHoodies = async () => {
            try {
                const res = await axios.get("http://localhost:3002/hoodie");
                setHoodies(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllHoodies();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:3002/hoodie/" + id);
            setHoodies(hoodies.filter(hoodie => hoodie.id !== id)); // Update state instead of reloading page
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="d-flex">
            <Sidebar />

            <div className="container mt-4">
                <h1 className="mb-4">Hoodies for Men</h1>

                <div className="row">
                    {hoodies.map(hoodie => (
                        <div key={hoodie.id} className="col-md-4 mb-4">
                            <div className="card shadow-sm p-3 text-center">
                                {hoodie.cover && (
                                    <img
                                        src={`http://localhost:3002${hoodie.cover}`}
                                        alt={hoodie.name}
                                        className="card-img-top"
                                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                    />
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">{hoodie.name}</h5>
                                    <p className="card-text">${hoodie.price}</p>
                                    <div className="d-flex justify-content-between">
                                        <button className="btn btn-danger" onClick={() => handleDelete(hoodie.id)}>Delete</button>
                                        <Link to={`/edithoodie-men/${hoodie.id}`} className="btn btn-primary">Edit</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <Link to="/addhoodie-men" className="btn btn-success mt-3">Add New Hoodie</Link>
            </div>
        </div>
    );
};

export default Hoodie;
