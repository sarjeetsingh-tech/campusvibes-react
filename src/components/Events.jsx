import React, { useState, useEffect } from 'react';
import TopSlider from './TopSlider';
import Search from './Search';
import Filters from './Filters';
import EventList from './EventList';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const images = [
    'https://res.cloudinary.com/dsgzsnnzy/image/upload/v1711037787/tkwokqxsgj6rgpso94jo.png',
    'https://res.cloudinary.com/dsgzsnnzy/image/upload/v1711037787/klwjnhtdi8ftizuchzjr.png',
    'https://res.cloudinary.com/dsgzsnnzy/image/upload/v1711037787/ew0ven2w1xaj6ayxs75w.png',
    'https://res.cloudinary.com/dsgzsnnzy/image/upload/v1711037786/obanbfiwfurp1wbbp3i6.png'
];

const htmlContent = [
    <h2 className="text-white">Slide 1</h2>,
    <h2 className="text-white">Slide 2</h2>,
    <h2 className="text-white">Slide 3</h2>,
    <h2 className="text-white">Slide 4</h2>
];

function Events() {
    const [events, setEvents] = useState([]);
    const [eventsNearYou, setEventsNearYou] = useState([]);
    const [recommendedEvents, setRecommendedEvents] = useState([]);
    const [yourCampusEvents, setYourCampusEvents] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSearched, setIsSearched] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const token = localStorage.getItem('token');
                const responseNearYou = await fetch('http://localhost:3000/events?section=near-you', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                });
                if (!responseNearYou.ok) {
                    throw new Error(`Failed to fetch events near you: ${responseNearYou.status} ${responseNearYou.statusText}`);
                }
                const dataNearYou = await responseNearYou.json();
                setEventsNearYou(dataNearYou.events);

                const responseRecommended = await fetch('http://localhost:3000/events?section=recommended', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                });
                if (!responseRecommended.ok) {
                    throw new Error(`Failed to fetch recommended events: ${responseRecommended.status} ${responseRecommended.statusText}`);
                }
                const dataRecommended = await responseRecommended.json();
                setRecommendedEvents(dataRecommended.events);

                const responseYourCampus = await fetch('http://localhost:3000/events?section=your-campus', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                });
                if (!responseYourCampus.ok) {
                    throw new Error(`Failed to fetch events at your campus: ${responseYourCampus.status} ${responseYourCampus.statusText}`);
                }
                const dataYourCampus = await responseYourCampus.json();
                setYourCampusEvents(dataYourCampus.events);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    const handleEventSearch = async (query) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/events?search=${query}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (!response.ok) {
                throw new Error(`Failed to search events: ${response.status} ${response.statusText}`);
            }
            const searchData = await response.json();
            setEvents(searchData.events);
            setIsSearched(true);
        } catch (error) {
            console.error('Error searching events:', error);
        }
    };

    const handleSeeAll = (category) => {
        setShowAll(true);
        setSelectedCategory(category);
    };

    const handleGoBack = () => {
        setShowAll(false);
        setSelectedCategory(null);
    };

    const handleNext = () => {
        setCurrentIndex(prevIndex => prevIndex + 1);
    };

    const handlePrevious = () => {
        setCurrentIndex(prevIndex => prevIndex - 1);
    };

    return (
        <div className='container mx-auto'>
            <TopSlider images={images} captions={[]} htmlContent={htmlContent} />
            <div className='flex w-full '>
                <div className=' w-full'>
                    <div className='mb-2'><Search onSearch={handleEventSearch} /></div>

                    {!showAll && !isSearched && (
                        <>
                            <EventList
                                title="Events Near You"
                                events={eventsNearYou.slice(0, 5)}
                                onSeeAll={() => handleSeeAll('near-you')}
                                isAll={false}
                            />

                            <EventList
                                title="Recommended"
                                events={recommendedEvents.slice(0, 5)}
                                onSeeAll={() => handleSeeAll('recommended')}
                                isAll={false}
                            />

                            <EventList
                                title="Your Campus"
                                events={yourCampusEvents.slice(0, 5)}
                                onSeeAll={() => handleSeeAll('your-campus')}
                                isAll={false}
                            />
                        </>
                    )}

                    {!showAll && isSearched && (
                        <>
                            <EventList
                                title="Searched Events ..."
                                events={events}
                                onSeeAll={() => handleSeeAll('all')}
                                isAll={true}
                                setIsSearched={setIsSearched}
                            />
                        </>
                    )}
                    {showAll && selectedCategory && (
                        <EventList
                            title={`All ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Events`}
                            events={
                                selectedCategory === 'near-you' ? eventsNearYou :
                                    selectedCategory === 'recommended' ? recommendedEvents :
                                        selectedCategory === 'your-campus' ? yourCampusEvents : []
                            }
                            onGoBack={handleGoBack}
                            isAll={true}
                        />
                    )}
                </div>
                {showAll && (
                    <div className="absolute top-1/2 -left-8">
                        {currentIndex > 0 && <FaChevronLeft onClick={handlePrevious} className="text-2xl cursor-pointer text-gray-400" />}
                    </div>
                )}
                {showAll && (
                    <div className="absolute top-1/2  -right-8">
                        {currentIndex < 5 && <FaChevronRight onClick={handleNext} className="text-2xl cursor-pointer text-gray-400" />}
                    </div>
                )}
            </div>
            
        </div>
    );
}

export default Events;
