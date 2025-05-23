import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Sidebar';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TshirtWomen = () => {
    const [tshirtsWomen, setTshirtsWomen] = useState([]);

    useEffect(() => {
        const fetchAllTshirtsWomen = async () => {
            try {
                const res = await axios.get("http://localhost:3002/tshirtwomen");
                setTshirtsWomen(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllTshirtsWomen();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:3002/tshirtwomen/" + id);
            setTshirtsWomen(tshirtsWomen.filter(tshirtwomen => tshirtwomen.id !== id)); // Update state instead of reloading page
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="d-flex">
            <Sidebar />

            <div className="container mt-4">
                <h1 className="mb-4">T-Shirts for Women</h1>

                <div className="row">
                    {tshirtsWomen.map(tshirtwomen => (
                        <div key={tshirtwomen.id} className="col-md-4 mb-4">
                            <div className="card shadow-sm p-3 text-center">
                                {tshirtwomen.cover && (
                                    <img
                                        src={`http://localhost:3002${tshirtwomen.cover}`}
                                        alt={tshirtwomen.name}
                                        className="card-img-top"
                                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                    />
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">{tshirtwomen.name}</h5>
                                    <p className="card-text">${tshirtwomen.price}</p>
                                    <div className="d-flex justify-content-between">
                                        <button className="btn btn-danger" onClick={() => handleDelete(tshirtwomen.id)}>Delete</button>
                                        <Link to={`/edittshirt-women/${tshirtwomen.id}`} className="btn btn-primary">Edit</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <Link to="/addtshirt-women" className="btn btn-success mt-3">Add New T-Shirt</Link>
            </div>
        </div>
    );
};

export default TshirtWomen;
