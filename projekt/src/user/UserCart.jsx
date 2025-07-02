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

  const saveCartToLocalStorage = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

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

  // Fix: Now handleQuantityChange and handleSizeChange update by item id
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

  if (orderPlaced && orderDetails) {
    return (
      <div className="d-flex min-vh-100" style={{ backgroundColor: '#f0e6f6' }}>
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
              {orderDetails.cartItems.map(item => (
                <tr key={item.id}>
                  <td><img src={`http://localhost:3002${item.image}`} alt={item.name} width="70" /></td>
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
    <div className="d-flex min-vh-100" style={{ backgroundColor: '#f0e6f6' }}>
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
                                        <select
                                        value={item.size}
                                        onChange={(e) => handleSizeChange(index, e.target.value)}
                                        className="form-select"
                                        >
                                        {[...Array(6)].map((_, i) => {
                                            const size = 40 + i;
                                            return <option key={size} value={size}>{size}</option>;
                                        })}
                                        </select>
                                    ) : item.type === 'tshirt' ||  item.type === 'hoodie'  ? (
                                        <select
                                        value={item.size}
                                        onChange={(e) => handleSizeChange(index, e.target.value)}
                                        className="form-select"
                                        >
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                        <option value="XL">XL</option>
                                        </select>
                                    ) : item.type === 'tshirtwomen' ||  item.type === 'hoodiewomen' ? (
                                        <select
                                        value={item.size}
                                        onChange={(e) => handleSizeChange(index, e.target.value)}
                                        className="form-select"
                                        >
                                        <option value="S">XS</option>
                                        <option value="M">S</option>
                                        <option value="L">M</option>
                                        <option value="XL">L</option>
                                        </select>                                    
                                    ) : item.type === 'tshirtkids' || item.type === 'hoodiekids' ? (
                                        <select
                                        value={item.size}
                                        onChange={(e) => handleSizeChange(index, e.target.value)}
                                        className="form-select"
                                        >
                                        <option value="XXS">XXS</option>
                                        <option value="XS">XS</option>
                                        <option value="S">S</option>
                                        </select>
                                    ) : item.type === 'shoewomen' ? (
                                        <select
                                        value={item.size}
                                        onChange={(e)=>handleSizeChange(index, e.target.value)}
                                        className='form-select'
                                        >
                                        {[...Array(5)].map((_, i) => {
                                            const size = 36 + i;
                                            return <option key={size} value={size}>{size}</option>;
                                        })}

                                        </select>
                                    ):  item.type === 'shoekids' ? (
                                        <select
                                        value={item.size}
                                        onChange={(e)=>handleSizeChange(index, e.target.value)}
                                        className='form-select'
                                        >
                                        {[...Array(6)].map((_, i) => {
                                            const size = 30 + i;
                                            return <option key={size} value={size}>{size}</option>;
                                        })}

                                        </select>
                                    ) : item.type === 'pants' ? (
                                        <select
                                        value={item.size}
                                        onChange={(e)=>handleSizeChange(index, e.target.value)}
                                        className='form-select'
                                        >
                                        {[...Array(13)].map((_, i) => {
                                            const size = 40 + i * 2;
                                            return <option key={size} value={size}>{size}</option>;
                                        })}

                                        </select>
                                    ) : item.type === 'pantswomen' ? (
                                        <select
                                        value={item.size}
                                        onChange={(e)=>handleSizeChange(index, e.target.value)}
                                        className='form-select'
                                        >
                                        {[...Array(13)].map((_, i) => {
                                            const size = 30 + i * 2;
                                            return <option key={size} value={size}>{size}</option>;
                                        })}

                                        </select>
                                    ) : item.type === 'pantskids' ? (
                                        <select
                                        value={item.size}
                                        onChange={(e)=>handleSizeChange(index, e.target.value)}
                                        className='form-select'
                                        >
                                        {[...Array(15)].map((_, i) => {
                                            const size = 92 + i * 6;
                                            return <option key={size} value={size}>{size}</option>;
                                        })}

                                        </select>
                                    ) :
                                    
                                    (
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

            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input type="text" className="form-control" value={firstName} onChange={e => setFirstName(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input type="text" className="form-control" value={lastName} onChange={e => setLastName(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input type="text" className="form-control" value={phone} onChange={e => setPhone(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Address</label>
              <input type="text" className="form-control" value={address} onChange={e => setAddress(e.target.value)} required />
            </div>

            <Elements stripe={stripePromise}>
              <CheckoutForm amount={totalAmount} onSuccess={handlePaymentSuccess} cartItems={cartItems} />
            </Elements>
          </>
        )}
      </div>
    </div>
  );
};

export default UserCart;
