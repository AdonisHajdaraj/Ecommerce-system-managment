import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Sidebar';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HoodieWomen = () => {
    const [hoodiesWomen, setHoodiesWomen] = useState([]);

    useEffect(() => {
        const fetchAllHoodiesWomen = async () => {
            try {
                const res = await axios.get("http://localhost:3002/hoodiewomen");
                setHoodiesWomen(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllHoodiesWomen();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:3002/hoodiewomen/" + id);
            setHoodiesWomen(hoodiesWomen.filter(hoodieWomen => hoodieWomen.id !== id)); // Update state instead of reloading page
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="d-flex">
            <Sidebar />

            <div className="container mt-4">
                <h1 className="mb-4">Hoodies for Women</h1>

                <div className="row">
                    {hoodiesWomen.map(hoodieWomen => (
                        <div key={hoodieWomen.id} className="col-md-4 mb-4">
                            <div className="card shadow-sm p-3 text-center">
                                {hoodieWomen.cover && (
                                    <img
                                        src={`http://localhost:3002${hoodieWomen.cover}`}
                                        alt={hoodieWomen.name}
                                        className="card-img-top"
                                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                    />
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">{hoodieWomen.name}</h5>
                                    <p className="card-text">${hoodieWomen.price}</p>
                                    <div className="d-flex justify-content-between">
                                        <button className="btn btn-danger" onClick={() => handleDelete(hoodieWomen.id)}>Delete</button>
                                        <Link to={`/edithoodie-women/${hoodieWomen.id}`} className="btn btn-primary">Edit</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <Link to="/addhoodie-women" className="btn btn-success mt-3">Add New Hoodie</Link>
            </div>
        </div>
    );
};

export default HoodieWomen;
