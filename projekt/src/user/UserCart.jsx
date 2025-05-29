import React, { useEffect, useState } from 'react';
import USidebar from './UserSidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51RTlF1FoxXfbMDdPzc2ete3fIgBP678DB62W8sIbG7Ro2IwQAk65AufMA7usXYfnO0m383UCq3jatLuM8p4qaUNq00h4kaAAmW');

const CheckoutForm = ({ amount, onSuccess, cartItems }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [cardError, setCardError] = useState(null);

  const handleCardChange = (event) => {
    setCardComplete(event.complete);
    setCardError(event.error ? event.error.message : null);
    setErrorMessage(event.error ? event.error.message : null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    if (!stripe || !elements) {
      setErrorMessage("Stripe is not loaded yet. Please wait.");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement || !cardComplete) {
      setErrorMessage("Please complete your card details.");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post('http://localhost:3002/api/create-payment-intent', { cartItems });
      const clientSecret = data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      if (result.error) {
        setErrorMessage(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        onSuccess(result.paymentIntent.id);
      }
    } catch (error) {
      setErrorMessage('Payment failed. Try again.');
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement onChange={handleCardChange} options={{ hidePostalCode: true }} />
      {cardError && <div className="text-danger mt-2">{cardError}</div>}
      {errorMessage && !cardError && <div className="text-danger mt-2">{errorMessage}</div>}
      <button className="btn btn-primary mt-3" type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
      </button>
    </form>
  );
};

const UserCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrderValidation = () => {
    if (!firstName.trim() || !lastName.trim() || !phone.trim() || !address.trim()) {
      alert('Please fill in all user details.');
      return false;
    }
    if (cartItems.length === 0) {
      alert('Your cart is empty.');
      return false;
    }
    return true;
  };

  const handlePaymentSuccess = async (paymentIntentId) => {
    if (!handlePlaceOrderValidation()) return;

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
          size: item.size || 'M',
          paymentIntentId,
        };
        await axios.post('http://localhost:3002/api/order', orderData);
      }

      setOrderDetails({
        firstName,
        lastName,
        phone,
        address,
        cartItems,
        totalAmount,
        paymentIntentId,
      });

      localStorage.removeItem('cart');
      setCartItems([]);
      setFirstName('');
      setLastName('');
      setPhone('');
      setAddress('');
      setOrderPlaced(true);
    } catch (error) {
      console.error('Failed to save order:', error);
      alert('Failed to save order after payment.');
    }
  };

  // Funksioni për fshirjen e item-it nga shporta dhe backend
  const handleDeleteItem = (itemId) => {
  // Përditëso vetëm frontend state dhe localStorage
  const updatedCart = cartItems.filter(item => item.id !== itemId);
  setCartItems(updatedCart);
  localStorage.setItem('cart', JSON.stringify(updatedCart));
};


  if (orderPlaced && orderDetails) {
    return (
      <div className="d-flex min-vh-100" style={{ backgroundColor: '#f0f0f0' }}>
        <USidebar />
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
      </div>
    );
  }

  return (
    <div className="d-flex min-vh-100" style={{ backgroundColor: '#f0f0f0' }}>
      <USidebar />
      <div className="container mt-4">
        <h2 className="text-center mb-4">🛒 Your Cart</h2>
        {cartItems.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          <>
            <table className="table table-bordered shadow bg-white">
              <thead className="table-primary">
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Size</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Action</th> {/* Kolona për Delete */}
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td><img src={item.image} alt={item.name} width="70" /></td>
                    <td>{item.name}</td>
                    <td>{item.size || 'M'}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="5" className="text-end fw-bold">Total</td>
                  <td className="fw-bold">${totalAmount.toFixed(2)}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>

            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input type="text" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input type="tel" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Address</label>
              <textarea className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>

            <Elements stripe={stripePromise}>
              <CheckoutForm
                amount={totalAmount}
                onSuccess={handlePaymentSuccess}
                cartItems={cartItems}
              />
            </Elements>
          </>
        )}
      </div>
    </div>
  );
};

export default UserCart;
