import React, { useContext, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { Link } from 'react-router-dom';
import './PlaceOrder.css';

const PlaceOrder = () => {
  const { foodList, quantities } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    country: '',
    state: '',
    zip: '',
  });

  
  const cartItems = foodList.filter(food => quantities[food.id] > 0);

  
  const subtotal = cartItems.reduce((acc, food) => acc + food.price * quantities[food.id], 0);
  const shipping = subtotal > 0 ? 10000.00 : 0.00; // Adjusted shipping to VND
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    console.log("Order placed:", { ...data, cartItems, subtotal, shipping, tax, total });
    alert("Order placed successfully!");
  };

  return (
    <div className="place-order-page">
      <div className="place-order-content">
        <div className="place-order-container">
          
          <div className="billing-section">
            <h2>Billing Address</h2>
            <form onSubmit={placeOrder}>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={data.firstName}
                    onChange={onChangeHandler}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={data.lastName}
                    onChange={onChangeHandler}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email</label>
                <div className="input-with-icon">
                  <span className="input-icon">@</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={data.email}
                    onChange={onChangeHandler}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={data.phone}
                  onChange={onChangeHandler}
                  required
                />
              </div>

              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={data.address}
                  onChange={onChangeHandler}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Country</label>
                  <select
                    name="country"
                    value={data.country}
                    onChange={onChangeHandler}
                    required
                  >
                    <option value="">Choose...</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="IN">India</option>
                    <option value="VN">Vietnam</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>State</label>
                  <select
                    name="state"
                    value={data.state}
                    onChange={onChangeHandler}
                    required
                  >
                    <option value="">Choose...</option>
                    <option value="CA">California</option>
                    <option value="NY">New York</option>
                    <option value="TX">Texas</option>
                    <option value="MH">Maharashtra</option>
                    <option value="SG">Ho Chi Minh City</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Zip Code</label>
                  <input
                    type="text"
                    name="zip"
                    value={data.zip}
                    onChange={onChangeHandler}
                    required
                  />
                </div>
              </div>

              <Link 
                to="/order" 
                className="btn btn-primary w-100 mb-3"
              >
                Continue to Checkout
              </Link>
            </form>
          </div>

         
          <div className="cart-section">
            {cartItems.length > 0 ? (
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img
                      src={item.imageUrl || "/api/placeholder/60/60"}
                      alt={item.name}
                      className="item-image"
                    />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>Price: {item.price.toLocaleString()} VND</p>
                      <span className="item-total">Total: {(item.price * quantities[item.id]).toLocaleString()} VND</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>Your cart is empty</p>
            )}

            <div className="cart-summary">
              <div className="summary-item">
                <span>Subtotal</span>
                <span>{subtotal.toLocaleString()} VND</span>
              </div>
              <div className="summary-item">
                <span>Shipping</span>
                <span>{shipping.toLocaleString()} VND</span>
              </div>
              <div className="summary-item">
                <span>Tax (10%)</span>
                <span>{tax.toLocaleString()} VND</span>
              </div>
              <div className="summary-total">
                <span><strong>Total (VND)</strong></span>
                <span><strong>{total.toLocaleString()} VND</strong></span>
              </div>
            </div>

            <Link to="/cart" className="back-to-cart">
              ← Back to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;