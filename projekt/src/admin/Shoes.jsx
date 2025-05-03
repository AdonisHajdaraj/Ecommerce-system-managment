import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Sidebar';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Shoes = () => {
    const [shoes, setShoes] = useState([]);

    // Funksioni që merr të gjitha produktet e këpucëve
    useEffect(() => {
        const fetchAllShoes = async () => {
            try {
                const res = await axios.get("http://localhost:3002/shoes");
                setShoes(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllShoes();
    }, []); // Ekzekutohet një herë kur komponenti ngarkohet

    // Funksioni për të fshirë një produkt
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3002/shoes/${id}`);
            // Përditëson listën e këpucëve duke fshirë produktin nga state
            setShoes((prevShoes) => prevShoes.filter(shoe => shoe.id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="d-flex">
            <Sidebar />

            <div className="container mt-4">
                <h1 className="mb-4">Shoes</h1>

                <div className="row">
                    {shoes.map((shoe) => (
                        <div key={shoe.id} className="col-md-4 mb-4">
                            <div className="card shadow-sm p-3 text-center">
                                {shoe.cover && (
                                    <img
                                        src={`http://localhost:3002${shoe.cover}`}
                                        alt={shoe.name}
                                        className="card-img-top"
                                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                    />
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">{shoe.name}</h5>
                                    <p className="card-text">${shoe.price}</p>
                                    <div className="d-flex justify-content-between">
                                        <button className="btn btn-danger" onClick={() => handleDelete(shoe.id)}>Delete</button>
                                        <Link to={`/editshoes/${shoe.id}`} className="btn btn-primary">Edit</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <Link to="/addshoes" className="btn btn-success mt-3">Add New Shoes</Link>
            </div>
        </div>
    );
};

export default Shoes;
