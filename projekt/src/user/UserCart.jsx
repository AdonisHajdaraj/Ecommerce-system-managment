import React, { useEffect, useState } from 'react';
import USidebar from './UserSidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

// Stripe imports
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51RTlF1FoxXfbMDdPzc2ete3fIgBP678DB62W8sIbG7Ro2IwQAk65AufMA7usXYfnO0m383UCq3jatLuM8p4qaUNq00h4kaAAmW');

const CheckoutForm = ({ cartItems, firstName, lastName, phone, address, clearCart }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    try {
      const { data: clientSecret } = await axios.post('http://localhost:3002/api/create-payment-intent', {
        amount: cartItems.reduce((acc, item) => acc + item.price * item.quantity * 100, 0),
      });

      const cardElement = elements.getElement(CardElement);

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${firstName} ${lastName}`,
            phone: phone,
            address: { line1: address },
          },
        },
      });

      if (paymentResult.error) {
        alert(paymentResult.error.message);
      } else {
        if (paymentResult.paymentIntent.status === 'succeeded') {
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
              created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
            };
            await axios.post("http://localhost:3002/api/order", orderData);
          }
          alert("Payment successful and order placed!");
          clearCart();
        }
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed, please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 p-4 border rounded shadow-sm bg-light">
      <h5 className="mb-3 text-secondary">Payment Information</h5>
      <div className="form-group mb-3">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#495057',
                '::placeholder': {
                  color: '#adb5bd',
                },
                fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
                padding: '12px',
              },
              invalid: {
                color: '#fa5252',
              },
            },
            hidePostalCode: true,
          }}
          className="form-control p-3"
        />
      </div>
      <button className="btn btn-success w-100" type="submit" disabled={!stripe}>
        Pay Now
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

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const clearCart = () => {
    localStorage.removeItem('cart');
    setCartItems([]);
    setFirstName('');
    setLastName('');
    setPhone('');
    setAddress('');
  };

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

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="d-flex min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      <USidebar />
      <div className="container my-5">
        <h2 className="text-center mb-4 text-primary fw-bold">🛒 Your Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-center fs-5 text-muted">Your cart is empty.</p>
        ) : (
          <div className="table-responsive shadow rounded bg-white">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-primary text-center">
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Size</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Total</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {cartItems.map((item, index) => (
                  <tr key={index} className="align-middle">
                    <td>
                      <img
                        src={`http://localhost:3002${item.image}`}
                        alt={item.name}
                        className="rounded"
                        style={{ width: '80px', height: '80px', objectFit: 'cover', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
                      />
                    </td>
                    <td className="fw-semibold">{item.name}</td>
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
                                        {[...Array(7)].map((_, i) => {
                                            const size = 34 + i * 2;
                                            return <option key={size} value={size}>{size}</option>;
                                        })}

                                        </select>
                                    ) : item.type === 'pantskids' ? (
                                        <select
                                        value={item.size}
                                        onChange={(e)=>handleSizeChange(index, e.target.value)}
                                        className='form-select'
                                        >
                                        {[...Array(6)].map((_, i) => {
                                            const size = 28 + i * 2;
                                            return <option key={size} value={size}>{size}</option>;
                                        })}

                                        </select>
                                    ) : (
                      <span className="fw-normal">N/A</span>
                    )}
                    </td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(index, e.target.value)}
                        className="form-control text-center"
                        style={{ maxWidth: '80px' }}
                      />
                    </td>
                    <td>{item.price.toFixed(2)} €</td>
                    <td>{(item.price * item.quantity).toFixed(2)} €</td>
                    <td>
                      <button
                        onClick={() => handleDelete(index)}
                        className="btn btn-outline-danger btn-sm"
                        title="Remove item"
                      >
                        &times;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="d-flex justify-content-end mt-4 fw-bold fs-5 text-secondary">
              Total: {cartTotal} €
            </div>

            <hr />

            <div className="row g-3 mt-4">
              <div className="col-md-6">
                <label htmlFor="firstName" className="form-label">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="form-control"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="lastName" className="form-label">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="form-control"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="phone" className="form-label">
                  Phone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  pattern="[0-9+\-\s]{7,15}"
                  title="Enter a valid phone number"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="address" className="form-label">
                  Address *
                </label>
                <input
                  type="text"
                  id="address"
                  className="form-control"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
            </div>

            <Elements stripe={stripePromise}>
              <CheckoutForm
                cartItems={cartItems}
                firstName={firstName}
                lastName={lastName}
                phone={phone}
                address={address}
                clearCart={clearCart}
              />
            </Elements>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCart;
