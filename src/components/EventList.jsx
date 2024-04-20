import React from 'react';
import SwipeableCardCarousel from './SwipeableCardCarousel.jsx';
import { Link } from 'react-router-dom';

function EventList({ title, events, onSeeAll, onGoBack, isAll, setIsSearched }) {
    return (
        <div className="p-4">
            <div className="flex justify-between mb-4">
                <h1 className="text-3xl font-bold">{title}</h1>
                <div>
                    {onSeeAll && !setIsSearched && (<button onClick={onSeeAll}>See All</button>)}
                    {onGoBack && !setIsSearched && (<button onClick={onGoBack}>Go Back</button>)}
                    {setIsSearched && (<button onClick={() => setIsSearched(false)}>Go Back</button>)}
                </div>
            </div>
            {isAll ? (
                <div>
                    {events.length === 0 ? (
                        <p className="text-lg text-gray-500">No events available.</p>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {events.map((event, index) => (
                                <Link to={`http://localhost:5173/events/${event._id}`} key={index}>
                                    <div className="border p-4 cursor-pointer hover:bg-gray-100">
                                        <img src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZXZlbnRzfGVufDB8fDB8fHww" alt={event.title} className="w-full h-[200px] object-cover mb-2" />
                                        <h2 className="text-lg font-bold mb-2">{event.title}</h2>
                                        <p className="text-sm mb-2">{event.description}</p>
                                        <p className="text-sm">Location: {event.location}</p>
                                        <p className="text-sm">Date & Time: {new Date(event.dateTime).toLocaleString()}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                events.length === 0 ? (
                    <p className="text-lg text-gray-500">No events available.</p>
                ) : (
                    <SwipeableCardCarousel
                        events={events}
                    />
                )
            )}
        </div>
    );
}

export default EventList;
