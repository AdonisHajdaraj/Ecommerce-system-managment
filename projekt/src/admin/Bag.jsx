import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Sidebar';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Bag= () => {
    const [bags, setBags] = useState([]);

    useEffect(() => {
        const fetchAllBags = async () => {
            try {
                const res = await axios.get("http://localhost:3002/bag");
                setBags(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllBags();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:3002/bag/" + id);
            setBags(bags.filter(bag => bag.id !== id)); // ✅ përdor shoe në vend të shoes për njësi
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="d-flex">
            <Sidebar />

            <div className="container mt-4">
                <h1 className="mb-4">Bag</h1>

                <div className="row">
                    {bags.map((bag) => (
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
                                    <div className="d-flex justify-content-between">
                                        <button className="btn btn-danger" onClick={() => handleDelete(bag.id)}>Delete</button>
                                        <Link to={`/editbag/${bag.id}`} className="btn btn-primary">Edit</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <Link to="/addbag" className="btn btn-success mt-3">Add New Bag</Link>
            </div>
        </div>
    );
};

export default Bag;
