import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Sidebar';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ShoesWomen = () => {
    const [shoesWomen, setShoesWomen] = useState([]);

    // Funksioni që merr të gjitha produktet e këpucëve
    useEffect(() => {
        const fetchAllShoesWomen = async () => {
            try {
                const res = await axios.get("http://localhost:3002/shoewomen");
                setShoesWomen(res.data);

            } catch (err) {
                console.log(err);
            }
        };
        fetchAllShoesWomen();
    }, []); // Ekzekutohet një herë kur komponenti ngarkohet

    // Funksioni për të fshirë një produkt
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3002/shoewomen/${id}`);
            // Përditëson listën e këpucëve duke fshirë produktin nga state
            setShoesWomen(shoesWomen.filter(shoewomen => shoewomen.id !== id)); // Update state instead of reloading page
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="d-flex">
            <Sidebar />

            <div className="container mt-4">
                <h1 className="mb-4">Shoes for Women</h1>

                <div className="row">
                    {shoesWomen.map((shoewomen) => (
                        <div key={shoewomen.id} className="col-md-4 mb-4">
                            <div className="card shadow-sm p-3 text-center">
                                {shoewomen.cover && (
                                    <img
                                        src={`http://localhost:3002${shoewomen.cover}`}
                                        alt={shoewomen.name}
                                        className="card-img-top"
                                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                    />
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">{shoewomen.name}</h5>
                                    <p className="card-text">${shoewomen.price}</p>
                                    <div className="d-flex justify-content-between">
                                        <button className="btn btn-danger" onClick={() => handleDelete(shoewomen.id)}>Delete</button>
                                        <Link to={`/editshoes-women/${shoewomen.id}`} className="btn btn-primary">Edit</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <Link to="/addshoes-women" className="btn btn-success mt-3">Add New Shoes</Link>
            </div>
        </div>
    );
};

export default ShoesWomen;
