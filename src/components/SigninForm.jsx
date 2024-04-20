import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Loader from './Loader';

function SigninForm() {
  // State variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      // Simulate a signin request (replace with actual signin logic)
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulating async operation
      // After successful signin
      toast.success('Signin successful!');
    } catch (error) {
      console.error('Error occurred while submitting form:', error.message);
      toast.error('Signin failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col flex-1 container mt-5 ' style={{ flexBasis: '55%' }}>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className=' w-4/6 mx-auto mt-20'>
          <p className='font-bold text-3xl text-gray-900 my-2'>Sign in to your account</p>
          <p className='text-sm text-gray-500 font-semibold'>Continue exploring events after signing in to your account</p>
          <div className='mt-4'>
            <TextField id="standard-basic" name="email" value={email} onChange={handleEmailChange} label="Email Address" variant="standard" className='w-full mt-4' />
          </div>
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
          <div className='mt-4 flex justify-between'>
            <div className='flex items-center'>
              <Checkbox disabled checked className='text-sm' size='small' sx={{ padding: 0 }} /> <p>Remember me</p>
            </div>
            <div><Link to='/reset-password' className='text-blue-700 font-semibold'>Forget Password?</Link></div>
          </div>
          <div className='mt-2 h-4'>
            {loading && (
              <div className='flex items-center justify-center h-full'>
                <Loader />
              </div>
            )}
          </div>
          <button type='submit' className='mt-5 flex items-center justify-center border border-gray-400 w-full p-2 rounded-md bg-blue-700 text-white'>Sign In</button>
          <div className='flex my-4 '> <p className='text-sm text-gray-500 font-semibold'>Don't have an account?</p><Link to="/signup" className='text-blue-600 ml-1 text-sm font-bold'>Create one now</Link></div>
        </div>
      </form>
    </div>
  );
}

export default SigninForm;
