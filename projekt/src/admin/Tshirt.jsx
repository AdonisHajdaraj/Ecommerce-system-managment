import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Sidebar';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Tshirt = () => {
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

    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:3002/tshirt/" + id);
            setTshirts(tshirts.filter(tshirt => tshirt.id !== id)); // Update state instead of reloading page
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="d-flex">
            <Sidebar />

            <div className="container mt-4">
                <h1 className="mb-4">T-Shirts</h1>

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
                                    <div className="d-flex justify-content-between">
                                        <button className="btn btn-danger" onClick={() => handleDelete(tshirt.id)}>Delete</button>
                                        <Link to={`/edittshirt/${tshirt.id}`} className="btn btn-primary">Edit</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <Link to="/addtshirt" className="btn btn-success mt-3">Add New T-Shirt</Link>
            </div>
        </div>
    );
};

export default Tshirt;
