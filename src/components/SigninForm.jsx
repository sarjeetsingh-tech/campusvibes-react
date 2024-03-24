import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Loader from './Loader';

function SigninForm() {
  // State variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Event handlers
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Sending signin request
      const response = await fetch('http://localhost:3000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      if (responseData.success && responseData.redirectUrl) {
        window.location.href = '/';
      } else {
        setError('Redirect URL not provided');
      }

    } catch (error) {
      console.error('Error occurred while submitting form:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col flex-1 ' style={{ flexBasis: '55%' }}>
      {/* Signin form */}
      <form onSubmit={handleSubmit} action="http://localhost:3000/signin" method="POST">
        <div className=' w-4/6 mx-auto mt-20'>
          <p className='font-bold text-3xl text-gray-900 my-2'>Sign in to your account</p>
          <p className='text-sm text-gray-500 font-semibold'>Continue exploring events after signing in to your account</p>
          {/* Google login button */}
          <button type="button" className='my-8 flex items-center justify-center border border-gray-400 w-full p-2 rounded-md'>
            <FcGoogle className='m-1 text-xl' />
            <p className='ml-1 font-bold text-gray-700'>Login with Google</p>
          </button>
          {/* Divider */}
          <div className="flex items-center justify-center">
            <div className="w-full border-t border-gray-300"></div>
            <div className="px-4 text-gray-500">or</div>
            <div className="w-full border-t border-gray-300"></div>
          </div>
          {/* Email field */}
          <div className='mt-4'>
            <TextField id="standard-basic" name="email" value={email} onChange={handleEmailChange} label="Email Address" variant="standard" className='w-full mt-4' />
          </div>
          {/* Password field */}
          <div className='mt-4'>
            <TextField
              id="filled-password-input"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="standard"
              className='w-full mt-4'
            />
          </div>
          {/* Remember me checkbox and Forgot Password link */}
          <div className='mt-4 flex justify-between'>
            <div className='flex items-center'>
              <Checkbox disabled checked className='text-sm' size='small' sx={{ padding: 0 }} /> <p>Remember me</p>
            </div>
            <div><p className=' text-blue-700 font-semibold'>Forget Password?</p></div>
          </div>
          {/* Loader and error messages */}
          <div className='mt-2 h-4'>
            {loading && (
              <div className='flex items-center justify-center h-full'>
                <Loader />
              </div>
            )}
            {error && !loading && <p className="text-red-500">{error}</p>}
          </div>
          {/* Signin button */}
          <button type='submit' className='mt-5 flex items-center justify-center border border-gray-400 w-full p-2 rounded-md bg-blue-700 text-white'>Sign In</button>
          {/* Signup link */}
          <div className='flex my-4 '> <p className='text-sm text-gray-500 font-semibold'>Don't have an account?</p><a href="/signup" className=' text-blue-600 ml-1 text-sm font-bold'>Create one now</a></div>
        </div>
      </form>
    </div>
  );
}

export default SigninForm;
