import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function OTPVerification({ email, setShowOTPSection, password, name, role, setError }) {
  // State for storing OTP values and error message
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [errorMessage, setErrorMessage] = useState('');

  // Effect to handle OTP input
  useEffect(() => {
    function OTPInput() {
      const inputs = document.querySelectorAll('#otp > *[id]');
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('input', function (event) {
          const { value } = event.target;
          if (/^\d*$/.test(value) && value.length <= 1) {
            setOtpValues(prevValues => {
              const newValues = [...prevValues];
              newValues[i] = value;
              return newValues;
            });
            if (i !== inputs.length - 1 && value !== '') inputs[i + 1].focus();
          }
        });
      }
    }
    OTPInput();
  }, []);

  // Effect to handle form submission when all OTP fields are filled
  useEffect(() => {
    if (otpValues.every(value => value !== '')) {
      handleSubmit();
    }
  }, [otpValues]);

  // Function to handle form submission
// Function to handle form submission
function handleSubmit() {
  const otp = otpValues.join('');
  fetch('http://localhost:3000/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, otp, password, name, role }),
  })
    .then(response => response.json())
    .then(data => {
      if (!data.success) {
        // Handle error
        toast.success(data.message); // Show error toast notification
      } else {
        // Handle successful form submission
        if (data.success) {
          window.location.href = '/signin';
        } else {
          setError('Redirect URL not provided');
        }
      }
    })
    .catch(error => {
      console.error(error.message);
      toast.error('An error occurred'); // Show generic error toast notification
    });
}


  // Function to go back
  function handleGoBack() {
    setShowOTPSection(false);
  }

  // Function to handle form submission on button click
  function handleFormSubmit(event) {
    event.preventDefault();
    handleSubmit();
  }

  // Render OTP verification form
  return (
    <div className="h-full flex justify-center mt-24">
      <div className="container mx-auto">
        <div className="max-w-sm mx-auto md:max-w-lg">
          <div className="w-full">
            <div className="bg-white h-64 py-3 rounded text-center">
              <h1 className="text-2xl font-bold">OTP Verification</h1>
              <div className="flex flex-col mt-4">
                <span className='p-1'>Enter the OTP you received at</span>
                <span className="text-md font-medium">{email}</span>
              </div>

              {/* OTP input fields */}
              <div id="otp" className="flex flex-row justify-center text-center px-2 mt-5">
                {[0, 1, 2, 3, 4, 5].map(index => (
                  <input key={index} className="m-2 border h-10 w-10 text-center form-control rounded" type="text" id={`otp${index}`} maxLength="1" />
                ))}
              </div>

              {/* Navigation buttons */}
              <div className='flex flex-row mt-12 justify-between'>
                <div className='flex items-center font-bold text-blue-700 justify-center'>
                  <FaArrowLeft className='mr-1' />
                  <p onClick={handleGoBack} className="cursor-pointer mr-2">Go back</p>
                </div>
                <div className="flex justify-center items-center text-center">
                  <button onClick={handleFormSubmit} className="flex items-center text-blue-700 font-bold hover:text-blue-900 cursor-pointer">
                    <span className="font-bold">Submit</span>
                    <FaArrowRight className='ml-1' />
                  </button>
                </div>
              </div>
              
              {/* Error message */}
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OTPVerification;
