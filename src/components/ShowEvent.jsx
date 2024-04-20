import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TopSlider from './TopSlider';
import { toast } from 'react-toastify';

const ShowEvent = () => {
  const [event, setEvent] = useState(null);
  const [registrationStatus, setRegistrationStatus] = useState('pending'); // 'pending', 'registered', or 'error'
 
  const location = useLocation();
  const images = [
    'https://res.cloudinary.com/dsgzsnnzy/image/upload/v1711037787/tkwokqxsgj6rgpso94jo.png',
    'https://res.cloudinary.com/dsgzsnnzy/image/upload/v1711037787/klwjnhtdi8ftizuchzjr.png',
    'https://res.cloudinary.com/dsgzsnnzy/image/upload/v1711037787/ew0ven2w1xaj6ayxs75w.png',
    'https://res.cloudinary.com/dsgzsnnzy/image/upload/v1711037786/obanbfiwfurp1wbbp3i6.png'
  ];

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        // Extracting event ID from the pathname
        const eventId = location.pathname.split('/').pop();
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/events/${eventId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        });
        const data = await response.json();
        if (data.success) {
          
          setEvent(data.event);
          const userId=localStorage.getItem('userId');

          if (data.event.attendees.includes(userId)) {
            
            setRegistrationStatus('Registered');
            
          } else {
            setRegistrationStatus('Register');
          }
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching event:', error);
        setRegistrationStatus('error');
      }
    };

    fetchEvent();
  }, [location]);

  const handleRegistration = async () => {
    try {
      const eventId = location.pathname.split('/').pop();
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/events/${eventId}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      const data = await response.json();
      if (data.success) {
        // Update registration status
        toast.success('Successfully registered for the event');
        setRegistrationStatus('registered');
      } else {
        toast('Already Registered')
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error registering for event:', error);
      setRegistrationStatus('error');
    }
  };

  if (!event) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto mt-8 shadow-lg">
      <div className="max-w-4xl mx-auto bg-white rounded-lg overflow-hidden p-3">
        <TopSlider images={images} captions={[]} htmlContent={[]} />
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-lg overflow-hidden ">
        <div className="px-6 py-4">
          <div className="font-bold text-3xl mb-4">{event.title}</div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {event.images.map((image, index) => (
              <img key={index} src={image.url} alt={`Image ${index + 1}`} className="w-full rounded-md shadow-md" />
            ))}
          </div>
          <p className="text-gray-700 text-lg mb-4">{event.description}</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-gray-700"><span className="font-semibold">Location:</span> {event.location}</div>
            <div className="text-gray-700"><span className="font-semibold">Date & Time:</span> {new Date(event.dateTime).toLocaleString()}</div>
            <div className="text-gray-700"><span className="font-semibold">Organizer:</span> {event.organizer}</div>
            <div className="text-gray-700"><span className="font-semibold">Category:</span> {event.category}</div>
            <div className="text-gray-700"><span className="font-semibold">Capacity:</span> {event.capacity}</div>
            <div className="text-gray-700"><span className="font-semibold">Registration Deadline:</span> {new Date(event.registrationDeadline).toLocaleString()}</div>
            <div className="text-gray-700"><span className="font-semibold">Price:</span> ${event.price}</div>
            <div className="text-gray-700"><span className="font-semibold">Status:</span> {event.status}</div>
          </div>
          
            <div className="flex flex-row justify-end mr-8">
              <button className="px-6 py-2 bg-gray-500 text-white font-semibold rounded hover:bg-gray-600" onClick={handleRegistration}>
                {registrationStatus}
              </button>
            </div>
         
          {/* {registrationStatus === 'registered' && (
            <p className="text-green-600 font-semibold text-lg">You are already registered for this event</p>
          )}
          {registrationStatus === 'error' && (
            <p className="text-red-600 font-semibold text-lg">An error occurred while processing your registration</p>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default ShowEvent;
