import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { Link } from 'react-router-dom'; // Import Link
import './Cart.css';

const Cart = () => {
  const { foodList, increaseQty, decreaseQty, quantities, removeFromCart } = useContext(StoreContext);

  // Lọc các item có quantities > 0
  const cartItems = foodList.filter(food => quantities[food.id] > 0);

  // Tính toán subtotal
  const subtotal = cartItems.reduce((acc, food) => acc + food.price * quantities[food.id], 0);

  // Tính toán shipping (giả định 0 nếu subtotal < 0, 10 nếu subtotal >= 0)
  const shipping = subtotal > 0 ? 10.00 : 0.00;

  // Tính toán tax (10% của subtotal)
  const tax = subtotal * 0.1;

  // Tính toán total
  const total = subtotal + shipping + tax;

  return (
    <div className="container py-5">
      <h1 className="mb-5">Your Shopping Cart</h1>
      <div className="row">
        <div className="col-lg-8">
          {cartItems.length === 0 ? (
            <div className="text-center">
              <p className="text-muted">Your cart is empty</p>
            </div>
          ) : (
            <div className="card mb-4">
              <div className="card-body">
                {cartItems.map((food) => (
                  <div key={food.id} className="row cart-item mb-3 align-items-center">
                    <div className="col-md-3">
                      <img
                        src={food.imageUrl || 'https://via.placeholder.com/100'} // Sử dụng imageUrl
                        alt={food.name}
                        className="img-fluid"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/100'; }} // Fallback nếu ảnh lỗi
                      />
                    </div>
                    <div className="col-md-5">
                      <h5 className="card-title">{food.name}</h5>
                      <p className="text-muted">Category: {food.category || 'Electronics'}</p>
                    </div>
                    <div className="col-md-2">
                      <div className="input-group">
                        <button className="btn btn-outline-secondary btn-sm" type="button" onClick={() => decreaseQty(food.id)}>-</button>
                        <input
                          style={{ maxWidth: '100px' }}
                          type="text"
                          className="form-control form-control-sm text-center"
                          value={quantities[food.id] || 0}
                          readOnly
                        />
                        <button className="btn btn-outline-secondary btn-sm" type="button" onClick={() => increaseQty(food.id)}>+</button>
                      </div>
                    </div>
                    <div className="col-md-2 text-end">
                      <p className="mb-0">${(food.price * quantities[food.id]).toFixed(2)}</p>
                      <button
                        className="btn btn-sm btn-outline-danger mt-2"
                        onClick={() => removeFromCart(food.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <Link
            to="/" // Đường dẫn đến trang Home
            className="btn btn-outline-primary mb-4"
          >
            <i className="bi bi-arrow-left me-2"></i>Continue Shopping
          </Link>
        </div>
        <div className="col-lg-4">
          {cartItems.length === 0 ? null : (
            <div>
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title mb-3">Order Summary</h5>
                  <div className="mb-2">
                    <span>Subtotal</span>
                    <span className="float-end">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="mb-2">
                    <span>Shipping</span>
                    <span className="float-end">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="mb-2">
                    <span>Tax</span>
                    <span className="float-end">${tax.toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className="mb-2">
                    <strong>Total</strong>
                    <strong className="float-end">${total.toFixed(2)}</strong>
                  </div>
                  <button className="btn btn-primary w-100 mb-3">Proceed to Checkout</button>
                </div>
              </div>
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;