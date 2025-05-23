import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Sidebar';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PantsWomen = () => {
    const [pantsWomen, setPantsWomen] = useState([]);

    // Funksioni që merr të gjitha produktet e pantollave
    useEffect(() => {
        const fetchAllPantsWomen = async () => {
            try {
                const res = await axios.get("http://localhost:3002/pantswomen");
                setPantsWomen(res.data);

            } catch (err) {
                console.log(err);
            }
        };
        fetchAllPantsWomen();
    }, []); // Ekzekutohet një herë kur komponenti ngarkohet

    // Funksioni për të fshirë një produkt
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3002/pantswomen/${id}`);
            // Përditëson listën e këpucëve duke fshirë produktin nga state
            setPantsWomen(pantsWomen.filter(pantwomen => pantwomen.id !== id)); // Update state instead of reloading page
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="d-flex">
            <Sidebar />

            <div className="container mt-4">
                <h1 className="mb-4">Pants for Women</h1>

                <div className="row">
                    {pantsWomen.map((pantwomen) => (
                        <div key={pantwomen.id} className="col-md-4 mb-4">
                            <div className="card shadow-sm p-3 text-center">
                                {pantwomen.cover && (
                                    <img
                                        src={`http://localhost:3002${pantwomen.cover}`}
                                        alt={pantwomen.name}
                                        className="card-img-top"
                                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                    />
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">{pantwomen.name}</h5>
                                    <p className="card-text">${pantwomen.price}</p>
                                    <div className="d-flex justify-content-between">
                                        <button className="btn btn-danger" onClick={() => handleDelete(pantwomen.id)}>Delete</button>
                                        <Link to={`/editpants-women/${pantwomen.id}`} className="btn btn-primary">Edit</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <Link to="/addpants-women" className="btn btn-success mt-3">Add New Pants</Link>
            </div>
        </div>
    );
};

export default PantsWomen;
