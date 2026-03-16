import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => cart.reduce((total, item) => total + parseFloat(item.cost.substring(1)) * item.quantity, 0).toFixed(2);

  const handleIncrement = (item) => dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  const handleDecrement = (item) => item.quantity > 1
    ? dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }))
    : dispatch(removeItem(item.name));
  const handleRemove = (item) => dispatch(removeItem(item.name));

  return (
    <div className="cart-container">
      <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>
      {cart.map(item => (
        <div className="cart-item" key={item.name}>
          <img className="cart-item-image" src={item.image} alt={item.name} />
          <div className="cart-item-details">
            <div>{item.name}</div>
            <div>{item.cost}</div>
            <div>
              <button onClick={() => handleDecrement(item)}>-</button>
              {item.quantity}
              <button onClick={() => handleIncrement(item)}>+</button>
            </div>
            <div>Total: ${(parseFloat(item.cost.substring(1)) * item.quantity).toFixed(2)}</div>
            <button onClick={() => handleRemove(item)}>Delete</button>
          </div>
        </div>
      ))}
      <button onClick={onContinueShopping}>Continue Shopping</button>
    </div>
  );
};

export default CartItem;