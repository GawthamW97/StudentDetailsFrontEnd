import React, { useState, useEffect } from "react";

const useForm = (initialFieldValues, validate, setCurrentId) => {
  const [values, setValues] = useState(initialFieldValues); // Initiate the state variable to contain the values of the student
  const [errors, setErrors] = useState({}); //State variable to contain errors from the field validation.

  const handleChange = (e) => {
    //function used to update the state variables when the data in TextFields are changed.
    const { id, value } = e.target;
    const fieldValue = { [id]: value };
    setValues({
      ...values,
      ...fieldValue,
    });
    validate(fieldValue); //Validate the Fileds
  };

  const resetForm = () => {
    //Reset the form
    setValues({
      ...initialFieldValues, //Initial object structure is passed
    });
    setErrors({}); //Errors are set as empty
    setCurrentId(0); //Current user id is set to 0
  };
  return {
    //return the functions and variabels that can be used in multiple components
    values,
    setValues,
    errors,
    setErrors,
    handleChange,
    resetForm,
  };
};

export default useForm;
