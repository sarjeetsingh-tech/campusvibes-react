import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const SwipeableCardCarousel = ({ events }) => {
  const [startIndex, setStartIndex] = useState(0);
  const cardWidth = 300; // Increased card width
  const containerRef = useRef(null);

  const handleSwipe = (direction) => {
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const cardsPerPage = Math.floor(containerWidth / cardWidth);

    let newIndex = startIndex;

    if (direction === 'left' && startIndex > 0) {
      newIndex = Math.max(0, startIndex - cardsPerPage);
    } else if (direction === 'right' && startIndex < events.length - cardsPerPage) {
      newIndex = Math.min(events.length - cardsPerPage, startIndex + cardsPerPage);
    }

    setStartIndex(newIndex);
  };

  return (
    <div className="flex items-center justify-center mt-4 relative">
      <button className="text-3xl absolute top-1/2 left-2 transform -translate-y-1/2 transition duration-300 ease-in-out focus:outline-none" onClick={() => handleSwipe('left')}>
        <svg className="w-8 h-8 text-gray-500 hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <div ref={containerRef} className="flex space-x-4 justify-between overflow-hidden" style={{ maxWidth: 'calc(100% - 100px)' }}>
        {events.slice(startIndex, startIndex + 4).map((event, index) => (
          <Link to={`http://localhost:5173/events/${event._id}`} key={index} className="w-[300px] bg-white overflow-hidden border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
            <div className='h-60 overflow-hidden'>
              <img src="https://source.unsplash.com/random" alt={event.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{event.title}</h2>
              <p className="text-gray-600 mb-2">{event.description}</p>
              <p className="text-sm text-gray-500"><b>Location:</b> {event.location}</p>
              <p className="text-sm text-gray-500"><b>Date & Time:</b> {new Date(event.dateTime).toLocaleString()}</p>
            </div>
          </Link>
        ))}
      </div>
      <button className="text-3xl absolute top-1/2 right-2 transform -translate-y-1/2 transition duration-300 ease-in-out focus:outline-none" onClick={() => handleSwipe('right')}>
        <svg className="w-8 h-8 text-gray-500 hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default SwipeableCardCarousel;
