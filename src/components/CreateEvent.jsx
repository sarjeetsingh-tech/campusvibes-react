import React, { useState } from 'react';
import { Button, TextField, TextareaAutosize } from '@mui/material';
import { CiCircleRemove } from "react-icons/ci";
import SloganRotator from './SloganRotator';

function CreateEvent() {
    const uploadMessages = [
        "Adding eventImages can attract more attendees and make your event stand out!",
        "Enhance the appeal of your event by uploading captivating eventImages.",
        "Pictures speak louder than words! Upload eventImages to showcase the excitement of your events.",
        "Captivate your audience with stunning event photos. Don't miss out on this opportunity!",
        "Visuals are key to grabbing attention. Upload eventImages to make your events unforgettable.",
        "Give attendees a sneak peek of what's in store by uploading vibrant event eventImages.",
        "Make your events unforgettable with compelling visuals. Upload eventImages now!",
    ];

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        dateTime: '0',
        organizer: '',
        category: '',
        capacity: '',
        registrationDeadline: '0',
        price: '',
        status: '',
        pinCode: '',
        campus: '',
        eventImages: [] // To store the selected eventImages
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(formData);
    };

    const handleImageChange = (e) => {
        const files = e.target.files;
        const updatedImages = Array.from(files);
        setFormData(prevState => ({
            ...prevState,
            eventImages: updatedImages
        }));
    };


    const handleRemoveImage = (index) => {
        const updatedImages = formData.eventImages.filter((_, i) => i !== index);
        setFormData(prevState => ({
            ...prevState,
            eventImages: updatedImages
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (key === 'eventImages') {
                    value.forEach((file, index) => {
                        formDataToSend.append(`eventImages[${index}]`, file);
                    });
                } else {
                    formDataToSend.append(key, value);
                }
            });
            formDataToSend.forEach((value, key) => {
                console.log(`${key}: ${value}`);
            });

            const response = await fetch('http://localhost:3000/events/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
                body: formDataToSend
            });
            const data = await response.json();
            console.log(data);
            // Handle success or error messages
        } catch (error) {
            console.error('Error creating event:', error);
            // Handle error
        }
    };


    return (
        <div className='w-full'>
            <div className="w-full   bg-white p-10 rounded-lg">
                <h1 className="text-3xl font-bold mb-8 text-center">Create Event</h1>
                <form onSubmit={handleSubmit} className="px-8" >
                    <div className='flex flex-col'>
                        <div className='flex w-full px-8'>
                            <div className=' w-[40%]'>
                                <div className='my-2'>

                                    <input type="file" accept="image/*" onChange={handleImageChange} name="eventImages" multiple />

                                </div>
                                {/* Display selected eventImages */}
                                {formData.eventImages.length === 0 && (
                                    <div className="mt-4">
                                        <SloganRotator slogans={uploadMessages} size="text-sm" />
                                    </div>
                                )}
                                <div className="carousel mt-4" style={{ maxHeight: '370px', overflowY: 'auto' }}>
                                    {formData.eventImages.map((file, index) => (
                                        <div key={index} className="relative p-2 mt-2">
                                            <img
                                                className="border"
                                                src={URL.createObjectURL(file)}
                                                alt={`Image ${index + 1}`}
                                                style={{ width: '100%', height: 'auto' }}
                                            />
                                            <button
                                                className="text-red-600 font-bold absolute top-2 right-2"
                                                onClick={() => handleRemoveImage(index)}
                                            >
                                                <CiCircleRemove className="text-3xl" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='w-[60%] px-8'>
                                <div className='my-2'>
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        label="Event Title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="w-full p-3 border rounded-md outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div className='my-2'>
                                    <TextareaAutosize
                                        rowsMin={4}
                                        placeholder="Description"
                                        className="w-full p-3 border rounded-md outline-none resize-none focus:border-blue-500"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='flex flex-wrap justify-between my-2'>
                                    <TextField

                                        variant="standard"
                                        label="Location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="w-[48%] p-3 border rounded-md outline-none focus:border-blue-500"
                                    />
                                    <TextField

                                        variant="standard"
                                        label="Date and Time"
                                        type="datetime-local"
                                        name="dateTime"
                                        value={formData.dateTime}
                                        onChange={handleChange}
                                        className="w-[48%] p-3 border rounded-md outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div className='flex flex-wrap justify-between my-2'>
                                    <TextField

                                        variant="standard"
                                        label="Organizer"
                                        name="organizer"
                                        value={formData.organizer}
                                        onChange={handleChange}
                                        className="w-[48%] p-3 border rounded-md outline-none focus:border-blue-500"
                                    />
                                    <TextField

                                        variant="standard"
                                        label="Organizing Campus"
                                        name="campus"
                                        value={formData.campus}
                                        onChange={handleChange}
                                        className="w-[48%] p-3 border rounded-md outline-none focus:border-blue-500"
                                    />
                                </div>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    label="Category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-md outline-none focus:border-blue-500"
                                />
                                <div className='flex flex-wrap justify-between my-2'>
                                    <TextField

                                        variant="standard"
                                        label="Capacity"
                                        type="number"
                                        name="capacity"
                                        value={formData.capacity}
                                        onChange={handleChange}
                                        className="w-[48%] p-3 border rounded-md outline-none focus:border-blue-500"
                                    />
                                    <TextField

                                        variant="standard"
                                        label="Registration Deadline"
                                        type="datetime-local"
                                        name="registrationDeadline"
                                        value={formData.registrationDeadline}
                                        onChange={handleChange}
                                        className="w-[48%] p-3 border rounded-md outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div className='flex flex-wrap justify-between my-2'>
                                    <TextField

                                        variant="standard"
                                        label="Price"
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className="w-[48%] p-3 border rounded-md outline-none focus:border-blue-500"
                                    />
                                    <TextField

                                        variant="standard"
                                        label="Pin Code"
                                        name="pinCode"
                                        value={formData.pinCode}
                                        onChange={handleChange}
                                        className="w-[48%] p-3 border rounded-md outline-none focus:border-blue-500"
                                    />
                                </div>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    label="Status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-md outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>
                        <div className="flex justify-start mt-6 ml-auto mr-12">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Create Event
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateEvent;
