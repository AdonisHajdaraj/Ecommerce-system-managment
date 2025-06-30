import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Sidebar';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Hat= () => {
    const [hats, setHats] = useState([]);

    useEffect(() => {
        const fetchAllHats = async () => {
            try {
                const res = await axios.get("http://localhost:3002/hat");
                setHats(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllHats();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:3002/hat/" + id);
            setHats(hats.filter(hat => hat.id !== id)); 
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="d-flex">
            <Sidebar />

            <div className="container mt-4">
                <h1 className="mb-4">Hat</h1>

                <div className="row">
                    {hats.map((hat) => (
                        <div key={hat.id} className="col-md-4 mb-4">
                            <div className="card shadow-sm p-3 text-center">
                                {hat.cover && (
                                    <img
                                        src={`http://localhost:3002${hat.cover}`}
                                        alt={hat.name}
                                        className="card-img-top"
                                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                    />
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">{hat.name}</h5>
                                    <p className="card-text">${hat.price}</p>
                                    <div className="d-flex justify-content-between">
                                        <button className="btn btn-danger" onClick={() => handleDelete(hat.id)}>Delete</button>
                                        <Link to={`/edithat/${hat.id}`} className="btn btn-primary">Edit</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <Link to="/addhat" className="btn btn-success mt-3">Add New Hat</Link>
            </div>
        </div>
    );
};

export default Hat;
