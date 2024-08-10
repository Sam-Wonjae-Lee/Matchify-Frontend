import React from 'react';


const EventDetails = () => {
    return (
        <div 
            className="flex flex-col min-h-screen w-screen overflow-y-auto" 
        >
            <div 
                className="absolute inset-0"
                style={{ 
                    backgroundImage: "url('olympic_basketball_final.svg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    opacity: 0.5,
                    zIndex: -1
                }}
            ></div>

            
            {/* Back Icon */}
            <div className="p-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
            </div>

            {/* Event Details */}
            <div className="p-4 text-white">
                <h1 className="text-3xl font-bold">Travis Scott Concert</h1>
                <p className="text-white mt-1">September 10, 2024</p>
                <p className="text-white">Toronto, ON - Scotiabank Arena</p>
                <p className="text-white mt-4">
                    Lorem ipsum dolor sit amet consectetur. Pellentesque sodales tristique rutrum ut urna sed lorem risus. Eget risus bibendum sed sed. Sit et at purus aliquam laoreet vestibulum massa. Id purus magna ut tortor quis libero. Eget.
                </p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between p-10">
                    <button className="bg-green-600 text-white py-2 px-4 w-2/5">Attending?</button>
                    <button className="bg-white text-green-600 py-2 px-4 w-2/5 border border-green-600">Tickets</button>
                </div>

                {/* Attendees Section */}
                <div className="p-4">
                    <h2 className="text-white text-lg font-bold mb-4">Attendees</h2>

                    {/* Attendee 1 */}
                    <div className="flex items-center p-4 mb-4 bg-gray-800 bg-opacity-60 rounded-lg">
                        <img src="https://via.placeholder.com/50" alt="Mei Wang" className="rounded-full w-12 h-12" />
                        <div className="flex-1 ml-4">
                            <h4 className="text-white font-bold">Mei Wang</h4>
                            <p className="text-white text-xs">Shared interest in EDM with favorite tracks by top DJs</p>
                        </div>
                        <div className="text-green-500 text-xs py-1 px-3 bg-gray-700 bg-opacity-60 rounded-full">Friends</div>
                    </div>

                    {/* Attendee 2 */}
                    <div className="flex items-center p-4 mb-4 bg-gray-800 bg-opacity-60 rounded-lg">
                        <img src="https://via.placeholder.com/50" alt="John Wu" className="rounded-full w-12 h-12" />
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