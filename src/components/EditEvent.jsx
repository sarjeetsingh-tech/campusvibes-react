import React, { useState, useEffect } from 'react';
import { Button, TextField, TextareaAutosize } from '@mui/material';

const EditEvent = () => {
    const [eventId, setEventId] = useState('');
    const [eventData, setEventData] = useState({
        title: '',
        description: '',
        location: '',
        dateTime: '',
        organizer: '',
        category: '',
        capacity: '',
        registrationDeadline: '',
        price: '',
        pinCode: '',
        campus: '',
        status: ''
    });

    useEffect(() => {
        const url = window.location.href;
        const urlParts = url.split('/');
        const eventIdFromURL = urlParts[urlParts.length - 2];
        setEventId(eventIdFromURL);
    }, []);

    useEffect(() => {
        const fetchEvent = async () => {
            if (eventId !== '') {
                try {
                    const token = localStorage.getItem('token');
                    const response = await fetch(`http://localhost:3000/events/${eventId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        }
                    });
                    const data = await response.json();
                    setEventData(data.event);
                } catch (error) {
                    console.error('Error fetching event:', error);
                }
            }
        };
        fetchEvent();
    }, [eventId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/events/${eventId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(eventData),
            });
            const data = await response.json();
            console.log('Event updated successfully:', data.event);
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    return (
        <div className='w-full bg-gray-50'>
            <div className="max-w-3xl mx-auto my-8 px-4 bg-white p-10 rounded-lg">
                <h2 className="text-3xl font-bold mb-8 ml-8">Edit Event</h2>
                <form onSubmit={handleSubmit} className="space-y-5 px-8">
                    <div className='my-2'>
                        <TextField
                            fullWidth
                            variant="standard"
                            label="Event Title"
                            name="title"
                            value={eventData.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='my-2'>
                        <TextareaAutosize
                            rowsMin={4}
                            placeholder="Description"
                            className="w-full p-3 border rounded-md outline-none resize-none focus:border-blue-500"
                            name="description"
                            value={eventData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex flex-wrap justify-between my-2'>
                        <TextField
                            className='w-[48%]'
                            variant="standard"
                            label="Location"
                            name="location"
                            value={eventData.location}
                            onChange={handleChange}
                        />
                        <TextField
                            className='w-[48%]'
                            variant="standard"
                            label="Date and Time"
                            type="datetime-local"
                            name="dateTime"
                            value={eventData.dateTime}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex flex-wrap justify-between my-2'>
                        <TextField
                            className='w-[48%]'
                            variant="standard"
                            label="Organizer"
                            name="organizer"
                            value={eventData.organizer}
                            onChange={handleChange}
                        />
                        <TextField
                            className='w-[48%]'
                            variant="standard"
                            label="Organizing Campus"
                            name="campus"
                            value={eventData.campus}
                            onChange={handleChange}
                        />
                    </div>
                    <TextField
                        fullWidth
                        variant="standard"
                        label="Category"
                        name="category"
                        value={eventData.category}
                        onChange={handleChange}
                    />
                    <div className='flex flex-wrap justify-between my-2'>
                        <TextField
                            className='w-[48%]'
                            variant="standard"
                            label="Capacity"
                            type="number"
                            name="capacity"
                            value={eventData.capacity}
                            onChange={handleChange}
                        />
                        <TextField
                            className='w-[48%]'
                            variant="standard"
                            label="Registration Deadline"
                            type="datetime-local"
                            name="registrationDeadline"
                            value={eventData.registrationDeadline}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex flex-wrap justify-between my-2'>
                        <TextField
                            className='w-[48%]'
                            variant="standard"
                            label="Price"
                            type="number"
                            name="price"
                            value={eventData.price}
                            onChange={handleChange}
                        />
                        <TextField
                            className='w-[48%]'
                            variant="standard"
                            label="Pin Code"
                            name="pinCode"
                            value={eventData.pinCode}
                            onChange={handleChange}
                        />
                    </div>
                    <TextField
                        fullWidth
                        variant="standard"
                        label="Status"
                        name="status"
                        value={eventData.status}
                        onChange={handleChange}
                    />
                <div className="flex flex-row justify-start mt-6  ">
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Update Event
                    </Button>
                </div>
                </form>


            </div>
        </div>
    );
};

export default EditEvent;
