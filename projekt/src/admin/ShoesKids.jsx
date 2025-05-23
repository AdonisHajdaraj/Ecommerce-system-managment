import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Sidebar';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ShoesKids = () => {
    const [shoesKids, setShoesKids] = useState([]);

    // Funksioni që merr të gjitha produktet e këpucëve
    useEffect(() => {
        const fetchAllShoesKids= async () => {
            try {
                const res = await axios.get("http://localhost:3002/shoeskids");
                setShoesKids(res.data);

            } catch (err) {
                console.log(err);
            }
        };
        fetchAllShoesKids();
    }, []); // Ekzekutohet një herë kur komponenti ngarkohet

    // Funksioni për të fshirë një produkt
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3002/shoeskids/${id}`);
            // Përditëson listën e këpucëve duke fshirë produktin nga state
            setShoesKids(shoesKids.filter(shoekids => shoekids.id !== id)); // Update state instead of reloading page
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="d-flex">
            <Sidebar />

            <div className="container mt-4">
                <h1 className="mb-4">Shoes for Kids</h1>

                <div className="row">
                    {shoesKids.map((shoekids) => (
                        <div key={shoekids.id} className="col-md-4 mb-4">
                            <div className="card shadow-sm p-3 text-center">
                                {shoekids.cover && (
                                    <img
                                        src={`http://localhost:3002${shoekids.cover}`}
                                        alt={shoekids.name}
                                        className="card-img-top"
                                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                    />
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">{shoekids.name}</h5>
                                    <p className="card-text">${shoekids.price}</p>
                                    <div className="d-flex justify-content-between">
                                        <button className="btn btn-danger" onClick={() => handleDelete(shoekids.id)}>Delete</button>
                                        <Link to={`/editshoes-kids/${shoekids.id}`} className="btn btn-primary">Edit</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <Link to="/addshoes-kids" className="btn btn-success mt-3">Add New Shoes</Link>
            </div>
        </div>
    );
};

export default ShoesKids;
