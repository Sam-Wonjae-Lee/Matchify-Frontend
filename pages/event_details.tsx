import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface EventDetailsProps {
    concert_id: string;
    concert_image: string;
    concert_name: string;
    concert_date: string;
    concert_location: string;
    venue: string;
    link: string;
}

const EventDetails: React.FC = () => {
    const router = useRouter();
    const [eventDetails, setEventDetails] = useState<EventDetailsProps | null>(null);
    const [isAttending, setIsAttending] = useState<boolean>(false);

    const fetchIsAttending = async () => {
        const response = await fetch(`http://localhost:8888/attend_concert/is_attending`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userID: sessionStorage.getItem("userId"), concertID: router.query.concert_id })
        });
        const attending = await response.json();
        setIsAttending(attending === 1);
        return attending === 1;
    };

    useEffect(() => {
        if (router.query) {
            fetchIsAttending();

            const { concert_id, concert_image, concert_name, concert_date, concert_location, venue, link } = router.query;
            setEventDetails({
                concert_id: concert_id as string,
                concert_image: concert_image as string,
                concert_name: concert_name as string,
                concert_date: concert_date as string,
                concert_location: concert_location as string,
                venue: venue as string,
                link: link as string
            });
        }
    }, [router.query]);

    if (!eventDetails) {
        return <div>Loading...</div>;
    }

    const { concert_image, concert_name, concert_date, concert_location, venue, link } = eventDetails;

    const handleTicketButtonPress = () => {
        console.log(eventDetails);
        window.open(link);
    };

    const handleBackButtonPress = () => {
        router.back();
    };

    const handleAttendButtonPress = async () => {
        if (isAttending) {
            await fetch(`http://localhost:8888/attend_concert/unadd_attendee`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userID: sessionStorage.getItem("userId"), concertID: router.query.concert_id })
            });
        } else {
            await fetch(`http://localhost:8888/attend_concert/add_attendee`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userID: sessionStorage.getItem("userId"), concertID: router.query.concert_id })
            });
        }

        setIsAttending(!isAttending);
    }

    return (
        <div className="flex flex-col min-h-screen w-screen">
            <div 
                className="absolute inset-0"
                style={{  
                    backgroundImage: `url(${concert_image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    opacity: 0.5,
                    zIndex: -1
                }}
            ></div>

            <div className="p-4">
                <button className="text-white py-2 px-4 rounded-full" onClick={handleBackButtonPress}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>
            </div>

            <div className="p-4 text-white">
                <h1 className="text-3xl font-bold">{concert_name}</h1>
                <p className="text-white mt-1">{concert_date}</p>
                <p className="text-white">{concert_location} - {venue}</p>
                <p className="text-white mt-4">
                    Lorem ipsum dolor sit amet consectetur. Pellentesque sodales tristique rutrum ut urna sed lorem risus. Eget risus bibendum sed sed. Sit et at purus aliquam laoreet vestibulum massa. Id purus magna ut tortor quis libero. Eget.
                </p>
            </div>

            <div className="flex justify-between p-10">
                <button 
                    className="bg-green-600 text-white py-2 px-4 w-2/5"
                    onClick={handleAttendButtonPress}
                >
                    {isAttending ? 'Unattend' : 'Attending?'}
                </button>
                <button 
                    className="bg-white text-green-600 py-2 px-4 w-2/5 border border-green-600" 
                    onClick={handleTicketButtonPress}
                >
                    Tickets
                </button>
            </div>

            <div className="p-4 h-80 overflow-y-auto no-scrollbar mt-2">
                <h2 className="text-white text-lg font-bold mb-4">Attendees</h2>
                <div className="flex items-center p-4 mb-4 bg-gray-800 bg-opacity-60 rounded-lg">
                    <img src="https://via.placeholder.com/50" alt="Marry Poppins" className="rounded-full w-12 h-12" />
                    <div className="flex-1 ml-4">
                        <h4 className="text-white font-bold">Mei Wang</h4>
                        <p className="text-white text-xs">Shared interest in EDM with favorite tracks by top DJs</p>
                    </div>
                    <div className="text-green-500 text-xs py-1 px-3 bg-gray-700 bg-opacity-60 rounded-full">Friends</div>
                </div>
                <div className="flex items-center p-4 mb-4 bg-gray-800 bg-opacity-60 rounded-lg">
                    <img src="https://via.placeholder.com/50" alt="John Waters" className="rounded-full w-12 h-12" />
                    <div className="flex-1 ml-4">
                        <h4 className="text-white font-bold">John Wu</h4>
                        <p className="text-gray-400 text-xs">Shared interest in EDM with favorite tracks by top DJs</p>
                    </div>
                    <div className="text-green-500 text-xs py-1 px-3 bg-gray-700 bg-opacity-60 rounded-full">Friends</div>
                </div>
            </div>
        </div>
    );
}

export default EventDetails;