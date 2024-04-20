import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import OTPVerification from './OTPVerification';
import SloganRotator from './SloganRotator';
import Loader from './Loader';

function SignupForm() {
    // State variables
    const [selectedRole, setSelectedRole] = useState(null);
    const [nameFieldLabel, setNameFieldLabel] = useState('Username');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showOTPSection, setShowOTPSection] = useState(false);

    // Function to handle role selection
    const handleRoleSelection = (role) => {
        if (role === 'campus') {
            setNameFieldLabel('Campus name');
        } else {
            setNameFieldLabel('Student name');
        }
        setSelectedRole(role);
    };

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/sendotp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message);
            }
            console.log(responseData);
            setShowOTPSection(true);
        } catch (error) {
            setError(error.message); // Set the error message from the response data
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Show loader while loading */}
            {loading && (
                <div className='ml-4 lg:ml-0 flex flex-col flex-1' style={{ flexBasis: '55%' }}>
                    <div className=" h-full flex justify-center items-center flex-col">
                        <div className='flex flex-col items-center justify-center'>
                            <SloganRotator />
                            <p className='text-lg font-bold my-2'>Sending OTP </p>
                            <Loader size="sm" />
                        </div>
                    </div>
                </div>
            )}
            {/* Show signup form when not loading */}
            {!loading && (
                <div className='ml-4 mt-10 lg:ml-0 flex flex-col flex-1 container' style={{ flexBasis: '55%' }}>
                    {!showOTPSection ? (
                        <form onSubmit={handleSubmit} className='w-full lg:w-4/6 mx-auto mt-4'>
                            <p className='font-bold text-3xl text-gray-900 my-2'>Sign up to your account</p>
                            <p className='text-sm text-gray-500 font-semibold'>Unlock exclusive features and connect with your community!</p>
                            {/* Role selection */}
                            <div className='flex items-center mt-8 mb-4'>
                                <p className="text-gray-600">Please specify your role:</p>
                                <div className="flex">
                                    <label className="flex items-center mr-4 ml-2">
                                        <Checkbox size='small'
                                            checked={selectedRole === 'student'}
                                            onChange={() => handleRoleSelection('student')}
                                        />
                                        <span className={` ${selectedRole === 'student' ? 'font-bold' : ''}`}>Student</span>
                                    </label>
                                    <label className="flex items-center">
                                        <Checkbox
                                            size='small'
                                            checked={selectedRole === 'campus'}
                                            onChange={() => handleRoleSelection('campus')}
                                        />
                                        <span className={` ${selectedRole === 'campus' ? 'font-bold' : ''}`}>Campus</span>
                                    </label>
                                </div>
                            </div>
                            {/* Signup with Google button */}
                            {/* <button className='mb-4 flex items-center justify-center border border-gray-400 w-full p-2 rounded-md'>
                                <FcGoogle className='m-1 text-xl' />
                                <p className='ml-1 font-bold text-gray-700'>Signup with Google</p>
                            </button> */}
                            {/* Divider */}
                            {/* <div className="flex items-center justify-center">
                                <div className="w-full border-t border-gray-300"></div>
                                <div className="px-4 text-gray-500">or</div>
                                <div className="w-full border-t border-gray-300"></div>
                            </div> */}
                            {/* Name field */}
                            <div className='mt-4'>
                                <TextField id="name" label={nameFieldLabel} variant="standard" value={name} onChange={(e) => setName(e.target.value)} className='w-full mt-4' />
                            </div>
                            {/* Email field */}
                            <div className='mt-4'>
                                <TextField id="email" label="Email Address" variant="standard" value={email} onChange={(e) => setEmail(e.target.value)} className='w-full mt-4' />
                            </div>
                            {/* Password field */}
                            <div className='mt-4'>
                                <TextField
                                    id="password"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    variant="standard"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='w-full mt-4'
                                />
                            </div>
                            {/* Signup button */}
                            <button type='submit' className='mt-8 flex items-center justify-center border border-gray-400 w-full p-2 rounded-md bg-blue-700 text-white'>Sign Up</button>
                            {/* Show error message */}
                            {error && <p className="text-red-500">{error}</p>}
                            {/* Signup link */}
                            <div className='flex my-4 '> <p className='text-sm text-gray-500 font-semibold'>Already have an account ?</p><a href="/signin" className=' text-blue-600 ml-1 text-sm font-bold'>Sign In now</a></div>
                        </form>
                    ) : (
                        // Show OTP verification section
                        <OTPVerification email={email} name={name} password={password} setShowOTPSection={setShowOTPSection} role={selectedRole} setError={setError} />
                    )}
                </div>
            )}
        </>
    );
}

export default SignupForm;
