import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyOrders = ({ userPhone, refresh, orderDetails }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/order/user/${userPhone}`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching user's orders:", error);
      }
    };

    if (userPhone) {
      fetchUserOrders();
    }
  }, [userPhone, refresh]);

  // Nëse ka orderDetails (porosi e sapo kryer), shfaq përmbledhjen e saj
  if (orderDetails && Object.keys(orderDetails).length > 0) {
    return (
      <div className="container mt-4">
        <h2>Thank you for your order!</h2>
        <p>Your payment was successful and your order is being processed.</p>

        <h4 className="mt-4">Order Summary</h4>
        <table className="table table-bordered shadow bg-white">
          <thead className="table-primary">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Size</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.cartItems.map((item, index) => (
              <tr key={index}>
                <td><img src={item.image} alt={item.name} width="70" /></td>
                <td>{item.name}</td>
                <td>{item.size || 'M'}</td>
                <td>{item.quantity}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="5" className="text-end fw-bold">Total</td>
              <td className="fw-bold">${orderDetails.totalAmount.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <div className="mt-3">
          <h5>Customer Info</h5>
          <p><strong>Name:</strong> {orderDetails.firstName} {orderDetails.lastName}</p>
          <p><strong>Phone:</strong> {orderDetails.phone}</p>
          <p><strong>Address:</strong> {orderDetails.address}</p>
          <p><strong>Payment ID:</strong> {orderDetails.paymentIntentId}</p>
        </div>
      </div>
    );
  }

  // Nëse nuk ka orderDetails, shfaq listën e porosive nga backend
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p className="text-center">You have no active orders.</p>
      ) : (
        <table className="table table-bordered shadow bg-white">
          <thead className="table-dark">
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Size</th>
              <th>Price</th>
              <th>Date</th>
              <th>Status</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.product_name}</td>
                <td>{order.quantity}</td>
                <td>{order.size || '-'}</td>
                <td>${parseFloat(order.price).toFixed(2)}</td>
                <td>{new Date(order.created_at).toLocaleString()}</td>
                <td>
                  {order.payment_intent_id ? (
                    <span className="text-success fw-bold">✔️ Paid</span>
                  ) : (
                    <span className="text-warning fw-bold">Pending</span>
                  )}
                </td>
                <td>{order.first_name} {order.last_name}</td>
                <td>{order.phone}</td>
                <td>{order.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyOrders;
