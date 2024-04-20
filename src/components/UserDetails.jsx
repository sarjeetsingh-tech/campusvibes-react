import React, { useState, useEffect } from 'react';
import SloganRotator from './SloganRotator';
import TextField from '@mui/material/TextField';
import { FcNext, FcPrevious } from "react-icons/fc";
import Checkbox from '@mui/material/Checkbox';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AuthImage from './AuthImage';

function UserDetails() {
    // State to manage active section and slogan index
    const [activeSection, setActiveSection] = useState(0);
    const [sloganIndex, setSloganIndex] = useState(0);

    // State for form data
    const [formData, setFormData] = useState({
        name: '',
        city: '',
        state: '',
        dateOfBirth: '',
        gender: '',
        interests: [],
        education: {
            campus: '',
            passingYear: ''
        },
        contact: {
            phone: '',
            alternateEmail: ''
        },
        pinCode:''
    });

    // State to determine if it's a small screen
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    // Handle form submission
    const handleSubmit = async () => {
        try {
            // Submit form data
            const token=localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/user/details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${token}`,
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                // Handle successful submission
                console.log('User details submitted successfully');
                const data = await response.json();
                console.log(data.redirectURL);
                if (data.success) {
                    window.location.href = '/';
                } else {
                    setError('Redirect URL not provided');
                }
                // Optionally, you can reset the form data state here
            } else {
                console.error('Failed to submit user details');
            }
        } catch (error) {
            console.error('Error submitting user details:', error);
        }
    };

    // Effect hook to handle window resize
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768); // Adjust breakpoint as needed
        };

        handleResize(); // Check initial screen size
        window.addEventListener('resize', handleResize); // Listen for resize events

        return () => {
            window.removeEventListener('resize', handleResize); // Clean up on unmount
        };
    }, []);

    // Handler for moving to the next section
    const handleNext = () => {
        setActiveSection(activeSection + 1);
        setSloganIndex(prevIndex => (prevIndex + 1) % 5); // Adjust 5 to the total number of slogans
    };

    // Handler for moving to the previous section
    const handlePrevious = () => {
        setActiveSection(activeSection - 1);
        setSloganIndex(prevIndex => (prevIndex - 1 + 5) % 5); // Adjust 5 to the total number of slogans
    };

    // Handler for form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Splitting the name by dot to handle nested state
        const nameParts = name.split('.');

        if (nameParts.length === 1) {
            // If the name doesn't contain a dot, it's a direct key of formData
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        } else if (nameParts.length === 2) {
            // If the name contains a dot, it's a nested key
            const [parentKey, childKey] = nameParts;
            setFormData(prevState => ({
                ...prevState,
                [parentKey]: {
                    ...prevState[parentKey],
                    [childKey]: value
                }
            }));
        }
    };

    // Handler for next/submit button click
    const handleButtonClick = () => {
        if (activeSection < 2) {
            handleNext(); // Move to the next section
        } else {
            handleSubmit(); // Submit the form data
        }
    };

    // Calculate progress percentage
    const progressPercent = ((activeSection + 1) / 3) * 100;

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200" style={{ background: `linear-gradient(to right, #C7C8CC 10%, #ffffff ${progressPercent}%)` }}>
            <div className="py-10 bg-white rounded-lg shadow-sm h-full  md:h-4/5 w-full md:w-4/5 mt-10  flex flex-col justify-between">
                {/* Personal Information Section */}
                <div className='flex flex-row w-full'>
                    {!isSmallScreen && (
                        <div className='px-8 flex justify-center items-center mx-auto my-auto w-[50%] ml-5 ' >
                            <SloganRotator index={sloganIndex} />
                        </div>
                    )}
                    <div className={`${isSmallScreen ? 'w-full' : 'w-[60%]'} p-8`} style={{ borderLeft: '1px solid #ccc' }}>
                        <div className={activeSection === 0 ? '' : 'hidden'}>
                            <h2 className="text-lg font-bold mb-4">Personal Information</h2>
                            <p className="text-sm text-gray-600 mb-4">Take a moment to provide your personal details for a personalized experience.</p>
                            <div className="mb-4">
                                <TextField id="standard-basic" label="Name" variant="standard" className='w-full' name='name' value={formData.name} onChange={handleChange} />
                            </div>
                            <div className='w-full flex mx-auto '>
                                <div className="mb-4 w-[50%] flex ">
                                    <TextField id="standard-basic" label="Gender" variant="standard" className='w-[90%]' name='gender' value={formData.gender} onChange={handleChange} />
                                </div>
                                <div className="mb-4 w-[50%] flex justify-end">
                                    <TextField id="standard-basic" label="Birth Year" variant="standard" className='w-[90%]' name='dateOfBirth' value={formData.dateOfBirth} onChange={handleChange} />
                                </div>
                            </div>
                            <div className='w-full flex mx-auto '>
                                <div className="mb-4 w-[50%] flex ">
                                    <TextField id="standard-basic" label="City" variant="standard" className='w-[90%]' name='city' value={formData.city} onChange={handleChange} />
                                </div>
                                <div className="mb-4 w-[50%] flex ">
                                    <TextField id="standard-basic" label="Pin Code" variant="standard" className='w-[90%]' name='pinCode' value={formData.pinCode} onChange={handleChange} />
                                </div>
                                <div className="mb-4 w-[50%] flex justify-end">
                                    <TextField id="standard-basic" label="State" variant="standard" className='w-[90%]' name='state' value={formData.state} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        {/* Professional Information Section */}
                        <div className={activeSection === 1 ? '' : 'hidden'}>
                            <h2 className="text-lg font-bold mb-4">Educational Information</h2>
                            <p className="text-sm text-gray-600 mb-4">Add details about your education to help us tailor your experience.</p>
                            <div className="mb-4">
                                <TextField id="standard-basic" label="College/University" variant="standard" className='w-full' name='education.campus' value={formData.education.campus} onChange={handleChange} />
                            </div>
                            <div className="mb-4">
                                <TextField id="standard-basic" label="Passing Year" variant="standard" className='w-full' name='education.passingYear' value={formData.education.passingYear} onChange={handleChange} />
                            </div>
                        </div>
                        {/* Contact Information Section */}
                        <div className={activeSection === 2 ? '' : 'hidden'}>
                            <h2 className="text-lg font-bold mb-4">Contact Information</h2>
                            <p className="text-sm text-gray-600 mb-4">Provide contact details for updates and notifications.</p>
                            <div className='flex flex-col space-y-24'>
                                <div >
                                    <div className="mb-4">
                                        <TextField id="standard-basic" label="Alternate Email" variant="standard" name='contact.alternateEmail' onChange={handleChange} value={formData.contact.alternateEmail} className='w-full' />
                                    </div>
                                    <div className="mb-4">
                                        <TextField id="standard-basic" label="Phone" variant="standard" className='w-full' name='contact.phone' onChange={handleChange} value={formData.contact.phone} />
                                    </div>
                                </div>
                                <div className='mt-auto mb-4  flex items-center justify-center'> {/* Add margin-bottom here */}
                                    <Checkbox /> {/* Checkbox component */}

                                    <p className="">I agree to the Terms of Service and Privacy Policy of Zoho Corporation</p> {/* Add margin-bottom here */}

                                </div>
                            </div>
                        </div>


                    </div>
                </div>
                {/* Navigation Buttons and Progress Bar */}
                <div className="flex flex-col items-center">
                    <div className='flex flex-row justify-between w-full px-10'>
                        {activeSection !== 0 && (
                            <button className="px-4 py-1 rounded-md flex flex-row text-xl hover:underline" onClick={handlePrevious} disabled={activeSection === 0}>
                                <FcPrevious className='mr-1 mt-1' />
                                Previous
                            </button>
                        )}
                        {activeSection === 0 && (<div></div>)}
                        <button className="px-4 py-1 rounded-md flex items-center text-xl hover:underline" onClick={handleButtonClick}>
                            {activeSection === 2 ? "Submit" : "Next"} <FcNext className='ml-1 mt-1' />
                        </button>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-[20%] h-2 bg-gray-300 rounded-lg my-4">
                        <div className="w-[80%] h-full bg-gray-800 rounded-lg" style={{ width: `${progressPercent}%` }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDetails;
