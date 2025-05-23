import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Sidebar';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TshirtKids = () => {
    const [tshirtsKids, setTshirtsKids] = useState([]);

    useEffect(() => {
        const fetchAllTshirtsKids = async () => {
            try {
                const res = await axios.get("http://localhost:3002/tshirtkids");
                setTshirtsKids(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllTshirtsKids();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:3002/tshirtkids/" + id);
            setTshirtsKids(tshirtsKids.filter(tshirtKids => tshirtKids.id !== id)); // Update state instead of reloading page
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="d-flex">
            <Sidebar />

            <div className="container mt-4">
                <h1 className="mb-4">T-Shirts for Kids</h1>

                <div className="row">
                    {tshirtsKids.map(tshirtkids => (
                        <div key={tshirtkids.id} className="col-md-4 mb-4">
                            <div className="card shadow-sm p-3 text-center">
                                {tshirtkids.cover && (
                                    <img
                                        src={`http://localhost:3002${tshirtkids.cover}`}
                                        alt={tshirtkids.name}
                                        className="card-img-top"
                                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                    />
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">{tshirtkids.name}</h5>
                                    <p className="card-text">${tshirtkids.price}</p>
                                    <div className="d-flex justify-content-between">
                                        <button className="btn btn-danger" onClick={() => handleDelete(tshirtkids.id)}>Delete</button>
                                        <Link to={`/edittshirt-kids/${tshirtkids.id}`} className="btn btn-primary">Edit</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <Link to="/addtshirt-kids" className="btn btn-success mt-3">Add New T-Shirt</Link>
            </div>
        </div>
    );
};

export default TshirtKids;
