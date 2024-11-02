import React, { useState } from 'react';
import { validation } from '../validations/validations';
import axios from 'axios';

// Define type for TypeScript to ensure strong typing for form state
interface ISubscribeInfoState {
  fullName: string;
  email: string;
  subscriptionFrequency: string;
  preferences: string;
  optIn: string;
}

// Define error state interface for better error management
interface IFormErrorState {
  fullNameError: string;
  emailError: string;
  preferenceError: string;
}

const Form = () => {
  // Initialize form input states
  const [state, setState] = useState<ISubscribeInfoState>({
    fullName: "",
    email: "",
    subscriptionFrequency: "",
    preferences: "",
    optIn: "",
  });

  // List of preferences for dropdown selection
  const preferencesList: string[] = [
    "Tech",
    "Wellness",
    "Business",
    "Finance",
    "Travel",
    "Arts",
  ];

  // Initialize form error state for validation errors
  const [formErrors, setFormErrors] = useState<IFormErrorState>({
    fullNameError: "",
    emailError: "",
    preferenceError: "",
  });

  // Additional states to manage form behavior and feedback messages
  const [mandatory, setMandatory] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [valid, setValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Define constant messages for form validation and error feedback
  type Messages = {
    FULL_NAME_ERROR: string;
    EMAIL_ERROR: string;
    PREFERENCE_ERROR: string;
    ERROR: string;
    MANDATORY: string;
  };

  const messages: Messages = {
    FULL_NAME_ERROR: "Please enter a valid name",
    EMAIL_ERROR: "Please enter a valid email",
    PREFERENCE_ERROR: "Please enter a preference",
    ERROR: "Please run the backend",
    MANDATORY: "Enter all the form fields",
  };

  // Handle form submission and send data to the server
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault(); // Prevent page reload on submit
    setErrorMessage("");
    setSuccessMessage("");

    //to mandatorily fill all fields
    if (state.fullName && state.email && state.preferences && state.subscriptionFrequency && state.optIn && valid) {
      setMandatory(false);
      //API call always in tryCatch
      try {
        const response = await axios.post("http://localhost:2500/subscribe", state);

        if (response.status === 200) {
          const subscriptionId = response.data?.id;
          setSuccessMessage(`You are successfully subscribed to InfoHub Newsletters with subscription Id: ${subscriptionId}`);
        } else {
          setErrorMessage(messages.ERROR);
        }
      } catch (error) {
        setErrorMessage(messages.ERROR);
      }
    } else {
      setMandatory(true);
      setErrorMessage(messages.MANDATORY);
    }
  };

  // Handle input changes and trigger validation
  const handleChange = (event: { target: { name: string; value: any } }): void => {
    const { name, value } = event.target;

    setState((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField(name, value);
  };

  // Validate individual fields based on input
  const validateField = (name: string, value: any): void => {
    let errorMessage = "";

    if (name === "fullName") {
      errorMessage = validation.validateFullName(value) ? "" : messages.FULL_NAME_ERROR;
    } else if (name === "email") {
      errorMessage = validation.validateEmail(value) ? "" : messages.EMAIL_ERROR;
    } else if (name === "preferences") {
      errorMessage = validation.validatePreferences(value) ? "" : messages.PREFERENCE_ERROR;
    }

    setFormErrors((prev) => ({
      ...prev,
      [`${name}Error`]: errorMessage,
    }));

    const allValid =
      !errorMessage &&
      validation.validateFullName(state.fullName) &&
      validation.validateEmail(state.email) &&
      validation.validatePreferences(state.preferences);

    setValid(allValid);
  };

  return (
    <div className='container mt-5'>
      <h1 className="mb-4">Subscription Form</h1>
      <form name="form" onSubmit={handleSubmit}>
        {/* Full Name Field */}
        <div className="form-group mb-3">
          <label htmlFor="fullName">Name:</label>
          <input
            type="text"
            className="form-control"
            name="fullName"
            id="fullName"
            value={state.fullName}
            onChange={handleChange}
          />
          {formErrors.fullNameError && <p className="text-danger">{formErrors.fullNameError}</p>}
        </div>

        {/* Email Field */}
        <div className="form-group mb-3">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
            value={state.email}
            onChange={(e) => handleChange(e)}
          />
          {formErrors.emailError && <p className="text-danger">{formErrors.emailError}</p>}
        </div>

        {/* Subscription Frequency Buttons */}
        <div className="form-group mb-3">
          <label>How often you want to receive our Newsletter?</label><br />
          <div className="d-flex ml-2 text-primary-emphasis">
            <input
              type="radio"
              id="weekly"
              name="subscriptionFrequency"
              value="Weekly"
              className='mx-2'
              checked={state.subscriptionFrequency === 'Weekly'}
              onChange={handleChange}
            />
            <label htmlFor="weekly">Weekly</label>

            <input
              type="radio"
              id="monthly"
              name="subscriptionFrequency"
              value="Monthly"
              className='mx-2'
              checked={state.subscriptionFrequency === 'Monthly'}
              onChange={handleChange}
            />
            <label htmlFor="monthly">Monthly</label>

            <input
              type="radio"
              id="annually"
              name="subscriptionFrequency"
              value="Annually"
              className='mx-2'
              checked={state.subscriptionFrequency === 'Annually'}
              onChange={handleChange}
            />
            <label htmlFor="annually">Annually</label>
          </div>
        </div>

        {/* Preferences Dropdown */}
        <div className="form-group mb-3">
          <label htmlFor="preferences">Newsletter Preferences:</label>
          <select
            name="preferences"
            className="form-select"
            id="preferences"
            value={state.preferences}
            onChange={handleChange}
          >
            <option value="" disabled>--Select your preferences--</option>
            {preferencesList.map((item) => (
              <option value={item} key={item}>{item}</option>
            ))}
          </select>
          {formErrors.preferenceError && <p className="text-danger">{formErrors.preferenceError}</p>}
        </div>

        <div className="form-group mb-3">
          <input
            type='checkbox'
            id='optIn'
            name='optIn'
            checked={state.optIn === "Yes"}
            onChange={(e) => setState((prevState) => ({
              ...prevState,
              optIn: e.target.checked ? "Yes" : ""
            }))}
            className=''
          />&nbsp;&nbsp;
          <label htmlFor="optIn">I agree to Recive Newsletter from InfoHub</label>
        </div>

        {/* Submit Button */}
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-primary"
          >
            Subscribe
          </button>
        </div>
      </form>

      {/* Loading, Error, and Success Messages */}
      {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
      {successMessage && <p className="text-success mt-3">{successMessage}</p>}
    </div>
  )
}

export default Form;
