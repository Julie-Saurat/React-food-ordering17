// import { useState } from 'react';

// import Input from '../UI/Input';
import useInput from '../../hooks/use-input';
import styles from './Checkout.module.css';

function Checkout(props) {
  // const [error, setError] = useState(null);

  const {
    enteredValue: enteredName,
    valueIsValid: nameIsValid,
    valueIsInvalid: nameIsInvalid,
    enteredValueChangeHandler: enteredNameChangeHandler,
    enteredValueBlurHandler: enteredNameBlurHandler,
    reset: nameReset,
    valueClasses: nameClasses
  } = useInput(value => value.trim().length > 1, styles);

  const {
    enteredValue: enteredStreet,
    valueIsValid: streetIsValid,
    valueIsInvalid: streetIsInvalid,
    enteredValueChangeHandler: enteredStreetChangeHandler,
    enteredValueBlurHandler: enteredStreetBlurHandler,
    reset: streetReset,
    valueClasses: streetClasses
  } = useInput(value => value.trim().length > 1, styles);

  const {
    enteredValue: enteredPostcode,
    valueIsValid: postcodeIsValid,
    valueIsInvalid: postcodeIsInvalid,
    enteredValueChangeHandler: enteredPostcodeChangeHandler,
    enteredValueBlurHandler: enteredPostcodeBlurHandler,
    reset: postcodeReset,
    valueClasses: postcodeClasses
  } = useInput(value => value.trim().length !== 0 && value.trim().length < 8, styles);

  const {
    enteredValue: enteredCity,
    valueIsValid: cityIsValid,
    valueIsInvalid: cityIsInvalid,
    enteredValueChangeHandler: enteredCityChangeHandler,
    enteredValueBlurHandler: enteredCityBlurHandler,
    reset: cityReset,
    valueClasses: cityClasses
  } = useInput(value => value.trim().length > 3, styles);

  const formIsValid = nameIsValid && streetIsValid && postcodeIsValid && cityIsValid

  // const postCartData = async (element) => {
  //   const response = await fetch('https://react-class-b341e-default-rtdb.firebaseio.com/Carts.json', {
  //     method: 'POST',
  //     headers: {'Content-Type': 'application/json'},
  //     body: JSON.stringify(element)
  //   });

  //   console.log(response.ok);
  //   if (!response.ok) {
  //     throw new Error('Your order could not be saved')
  //   }
  // };

  function submitHandler(event) {
    event.preventDefault();

    if (!formIsValid) {
      return;
    } 

    const cartData = {
      // id: Math.floor(Math.random() * 100000000),
      // totalAmount: props.cartAmount,
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostcode,
      city: enteredCity
    }

    // postCartData(cartData).catch ((error) => {
    //   setError(error.message);
    // });

    props.onConfirm(cartData);

    nameReset();
    streetReset();
    postcodeReset();
    cityReset();

    // props.onCancel();
  };


  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={nameClasses}>
        <label htmlFor='name'>Your name</label>
        <input
          id='name'
          type='text'
          onChange={enteredNameChangeHandler}
          onBlur={enteredNameBlurHandler}
          value={enteredName}
        />
        {nameIsInvalid && <p>Please enter a valid name</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor='street'>Your street</label>
        <input
          id='street'
          type='text'
          onChange={enteredStreetChangeHandler}
          onBlur={enteredStreetBlurHandler}
          value={enteredStreet}
        />
        {streetIsInvalid && <p>Please enter a valid street</p>}
      </div>
      <div className={postcodeClasses}>
        <label htmlFor='postcode'>Your postal code</label>
        <input
          id='postcode'
          type='text'
          onChange={enteredPostcodeChangeHandler}
          onBlur={enteredPostcodeBlurHandler}
          value={enteredPostcode}
        />
        {postcodeIsInvalid && <p>Please enter a valid postal code</p>}
      </div>
      <div className={cityClasses}>
        <label htmlFor='city'>Your city</label>
        <input
          id='city'
          type='text'
          onChange={enteredCityChangeHandler}
          onBlur={enteredCityBlurHandler}
          value={enteredCity}
        />
        {cityIsInvalid && <p>Please enter a valid city</p>}
      </div>

      {/* <Input 
        label='Your name'
        ref={reference}
        input={{
          id: 'name',
          type: 'text',
          onChange: {enteredNameChangeHandler},
          onBlur: {enteredNameBlurHandler},
          value: {enteredName}
        }}
      /> */}
      {/* {error && <p>{error}</p>} */}
      <div className={styles.actions}>
        <button type='button' onClick={props.onCancel}>Cancel</button>
        <button className={styles.submit}>Submit</button>
      </div>
    </form>
  );
};

export default Checkout;