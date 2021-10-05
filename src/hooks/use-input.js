import { useState } from 'react';

const useInput = (validateFunction, styles) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [enteredValueIsTouched, setEnteredValueIsTouched] = useState(false);

  const valueIsValid = validateFunction(enteredValue);
  const valueIsInvalid = !valueIsValid && enteredValueIsTouched


  function enteredValueChangeHandler(event) {
    setEnteredValue(event.target.value)
  };

  function enteredValueBlurHandler(event) {
    setEnteredValueIsTouched(true);
  };

  function reset() {
    setEnteredValue('');
    setEnteredValueIsTouched(false);
  };

  // const valueClasses = valueIsInvalid ? `${styles.control} ${styles.invalid}` : `${styles.control}`;

  const valueClasses = `${styles.control} ${valueIsInvalid ? styles.invalid : ''}`;


  return {
    enteredValue,
    valueIsValid,
    valueIsInvalid,
    enteredValueChangeHandler,
    enteredValueBlurHandler,
    reset,
    valueClasses
  }
};

export default useInput;