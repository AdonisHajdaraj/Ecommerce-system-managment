import React, { useEffect, useState } from 'react';
import USidebar from './UserSidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


const UserCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);
    }, []);

    const handleQuantityChange = (index, value) => {
        const quantity = Math.max(1, Number(value)); 
        const updatedItems = [...cartItems];
        updatedItems[index].quantity = quantity;
        setCartItems(updatedItems);
        localStorage.setItem('cart', JSON.stringify(updatedItems));
    };

    const handleSizeChange = (index, value) => {
        const updatedItems = [...cartItems];
        updatedItems[index].size = value;
        setCartItems(updatedItems);
        localStorage.setItem('cart', JSON.stringify(updatedItems));
    };

    const handleDelete = (index) => {
        const updatedItems = [...cartItems];
        updatedItems.splice(index, 1);
        setCartItems(updatedItems);
        localStorage.setItem('cart', JSON.stringify(updatedItems));
    };

    const handlePlaceOrder = async () => {
        if (!firstName.trim() || !lastName.trim() || !phone.trim() || !address.trim()) {
            alert('Please fill in all fields: name, surname, phone number, and address.');
            return;
        }
    
        try {
            for (const item of cartItems) {
                const orderData = {
                    firstName,
                    lastName,
                    phone,
                    address,
                    productId: item.id,
                    productName: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    size: item.size,
                    created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
                };
    
                await axios.post("http://localhost:3002/api/order", orderData);
            }
    
            alert("Order placed successfully!");
            localStorage.removeItem('cart');
            setCartItems([]);
            setFirstName('');
            setLastName('');
            setPhone('');
            setAddress('');
        } catch (error) {
            console.error("Failed to place order:", error);
            alert("There was a problem placing your order.");
        }
    };
    
    
    return (
        <div className="d-flex min-vh-100" style={{ backgroundColor: '#f0f0f0' }}>
            <USidebar />
            <div className="container mt-4">
                <h2 className="text-center mb-4">🛒 Your Cart</h2>
                {cartItems.length === 0 ? (
                    <p className="text-center">Your cart is empty.</p>
                ) : (
                    <table className="table table-bordered shadow bg-white">
                        <thead className="table-primary">
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Size</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <img
                                            src={`http://localhost:3002${item.image}`}
                                            alt={item.name}
                                            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                        />
                                    </td>
                                    <td>{item.name}</td>
                                    <td>
                                    {item.type === 'shoe' ? (
                                        <select value={item.size} onChange={(e) => handleSizeChange(index, e.target.value)} className="form-select">
                                            {[...Array(9)].map((_, i) => {
                                                const size = 36 + i;
                                                return <option key={size} value={size}>{size}</option>;
                                            })}
                                        </select>
                                    ) : item.type === 'tshirt' ? (
                                        <select value={item.size} onChange={(e) => handleSizeChange(index, e.target.value)} className="form-select">
                                            <option value="S">S</option>
                                            <option value="M">M</option>
                                            <option value="L">L</option>
                                            <option value="XL">XL</option>
                                        </select>
                                    ) : (
                                        <input className="form-control" value="-" disabled />
                                    )}
                                    
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(index, e.target.value)}
                                            className="form-control"
                                        />
                                    </td>
                                    <td>${item.price}</td>
                                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                                    <td>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(index)}>
                                            🗑 Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {cartItems.length > 0 && (
                    <>
                        <div className="form-group mt-4">
                            <label htmlFor="firstName">First Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                placeholder="Enter your first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group mt-3">
                            <label htmlFor="lastName">Last Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                placeholder="Enter your last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group mt-3">
                            <label htmlFor="phone">Phone Number:</label>
                            <input
                                type="tel"
                                className="form-control"
                                id="phone"
                                placeholder="Enter your phone number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group mt-3">
                            <label htmlFor="address">Delivery Address:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                placeholder="Enter your address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="text-center mt-4">
                            <button className="btn btn-success px-4" onClick={handlePlaceOrder}>
                                ✅ Place Order
                            </button>
                        </div>
                    </>
                )}

            </div>
        </div>
    );
};

export default UserCart;
