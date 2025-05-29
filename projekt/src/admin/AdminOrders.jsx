import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Sidebar';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3002/api/order');
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this order?");
  if (!confirmDelete) return;

  try {
    await axios.delete(`http://localhost:3002/api/order/${id}`);
    setOrders(orders.filter(order => order.id !== id));
  } catch (error) {
    console.error("Error deleting order:", error);
  }
};


  // Map phone numbers to color classes for table rows
  const phoneColorMap = {};
  const colorClasses = [
    "table-primary",
    "table-success",
    "table-warning",
    "table-info",
    "table-secondary",
    "table-light"
  ];
  let colorIndex = 0;

  orders.forEach(order => {
    if (!phoneColorMap[order.phone]) {
      phoneColorMap[order.phone] = colorClasses[colorIndex % colorClasses.length];
      colorIndex++;
    }
  });

  return (
    <div className="d-flex min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      <Sidebar />
      <div className="container mt-4">
        <h2 className="text-center mb-4">Orders</h2>
        {orders.length === 0 ? (
          <p className="text-center">No orders found.</p>
        ) : (
          <table className="table table-bordered shadow bg-white">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Size</th>
                <th>Price</th>
                <th>Order Date</th>
                <th>Payment Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className={phoneColorMap[order.phone]}>
                  <td>{order.id}</td>
                  <td>{order.first_name}</td>
                  <td>{order.last_name}</td>
                  <td>{order.phone}</td>
                  <td>{order.address}</td>
                  <td>{order.product_name}</td>
                  <td>{order.quantity}</td>
                  <td>{order.size || '-'}</td>
                  <td>${order.price.toFixed(2)}</td>
                  <td>{new Date(order.created_at).toLocaleString()}</td>
                  <td>
                    {order.payment_intent_id ? (
                      <span className="text-success fw-bold">✔️ Completed</span>
                    ) : (
                      <span className="text-danger fw-bold">❌ Not Paid</span>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(order.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
