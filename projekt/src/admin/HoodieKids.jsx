import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Sidebar';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HoodieKids = () => {
    const [hoodiesKids, setHoodiesKids] = useState([]);

    useEffect(() => {
        const fetchAllHoodiesKids = async () => {
            try {
                const res = await axios.get("http://localhost:3002/hoodiekids");
                setHoodiesKids(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllHoodiesKids();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:3002/hoodiekids/" + id);
            setHoodiesKids(hoodiesKids.filter(hoodieKids => hoodieKids.id !== id)); // Update state instead of reloading page
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="d-flex">
            <Sidebar />

            <div className="container mt-4">
                <h1 className="mb-4">Hoodies for Kids</h1>

                <div className="row">
                    {hoodiesKids.map(hoodieKids => (
                        <div key={hoodieKids.id} className="col-md-4 mb-4">
                            <div className="card shadow-sm p-3 text-center">
                                {hoodieKids.cover && (
                                    <img
                                        src={`http://localhost:3002${hoodieKids.cover}`}
                                        alt={hoodieKids.name}
                                        className="card-img-top"
                                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                    />
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">{hoodieKids.name}</h5>
                                    <p className="card-text">${hoodieKids.price}</p>
                                    <div className="d-flex justify-content-between">
                                        <button className="btn btn-danger" onClick={() => handleDelete(hoodieKids.id)}>Delete</button>
                                        <Link to={`/edithoodie-kids/${hoodieKids.id}`} className="btn btn-primary">Edit</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <Link to="/addhoodie-kids" className="btn btn-success mt-3">Add New Hoodie</Link>
            </div>
        </div>
    );
};

export default HoodieKids;
