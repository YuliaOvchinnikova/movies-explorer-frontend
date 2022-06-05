import { useState, useCallback } from 'react';
import validator from 'validator';

function useFormWithValidation({ name, email, password }) {
  const [values, setValues] = useState({ name, email, password });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);
  const [isChanged, setIsChanged] = useState(false);

  const handleChange = (event) => {
    const target = event.target;
    setValues({ ...values, [target.name]: target.value });
    setErrors({ ...errors, [target.name]: target.validationMessage });
    const emailIsValid =
      target.name === 'email' ? validator.isEmail(target.value) : true;
    setIsValid(target.closest('form').checkValidity() && emailIsValid);
    if (!emailIsValid) {
      setErrors({ ...errors, email: 'Email is invalid' });
    }

    if (
      (target.name === 'name' && target.value !== name) ||
      (target.name === 'email' && target.value !== email)
    ) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  };

  const resetForm = useCallback(
    (
      newValues = { name, email, password },
      newErrors = {},
      newIsValid = false
    ) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid, name, email, password]
  );

  return [values, handleChange, errors, isValid, resetForm, isChanged];
}

export default useFormWithValidation;
