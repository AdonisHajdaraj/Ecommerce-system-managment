import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Sidebar';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Pants = () => {
    const [pants, setPants] = useState([]);

    // Funksioni që merr të gjitha produktet e pantollave
    useEffect(() => {
        const fetchAllPants = async () => {
            try {
                const res = await axios.get("http://localhost:3002/pants");
                setPants(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllPants();
    }, []); // Ekzekutohet një herë kur komponenti ngarkohet

    // Funksioni për të fshirë një produkt
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3002/pants/${id}`);
            // Përditëson listën e këpucëve duke fshirë produktin nga state
            setPants((prevPants) => prevPants.filter(pant => pant.id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="d-flex">
            <Sidebar />

            <div className="container mt-4">
                <h1 className="mb-4">Pants for Men</h1>

                <div className="row">
                    {pants.map((pant) => (
                        <div key={pant.id} className="col-md-4 mb-4">
                            <div className="card shadow-sm p-3 text-center">
                                {pant.cover && (
                                    <img
                                        src={`http://localhost:3002${pant.cover}`}
                                        alt={pant.name}
                                        className="card-img-top"
                                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                    />
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">{pant.name}</h5>
                                    <p className="card-text">${pant.price}</p>
                                    <div className="d-flex justify-content-between">
                                        <button className="btn btn-danger" onClick={() => handleDelete(pant.id)}>Delete</button>
                                        <Link to={`/editpants-men/${pant.id}`} className="btn btn-primary">Edit</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <Link to="/addpants-men" className="btn btn-success mt-3">Add New Pants</Link>
            </div>
        </div>
    );
};

export default Pants;
