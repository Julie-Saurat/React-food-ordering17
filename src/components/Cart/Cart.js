import { useContext, useState, Fragment } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [formIsShown, setFormIsShown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const cartClearHandler = () => {
    cartCtx.clearCart();
  }

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch('https://react-class-b341e-default-rtdb.firebaseio.com/Orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderItems: cartCtx.items
      })
    });

    setIsSubmitting(false);
    setDidSubmit(true);
    cartClearHandler();
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          // onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onRemove={cartItemRemoveHandler(item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const showFormHandler = () => {
    setFormIsShown(true);
  };

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems &&
        <button className={classes.button} onClick={showFormHandler}>Order</button>
      }
    </div>
  );

  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {formIsShown && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} /*cartAmount={totalAmount}*/ />}
      {!formIsShown && modalActions}
    </Fragment>
  );

  const isSubmittingModalContent = <p>Sending ordered data...</p>;

  const didSubmitModalContent = (
    <Fragment>
      <p>Order sucessfully sent</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
