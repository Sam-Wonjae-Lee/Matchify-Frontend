import React from 'react';
import SmallProfileImages from './small_profile_images';

interface EventCardProps {
    key:number;
    eventName: string;
    eventDate: string;
    eventLocation: string;
    eventImage: string;
    friendImage1: string;
    friendImage2 ?: string;
    friendName1: string;
    friendName2 ?: string;
    additionalCount: number;
    onClick: () => void;
}

const EventCard: React.FC<EventCardProps> = ({eventName, eventDate, eventLocation, eventImage,
    friendImage1, friendImage2, friendName1, friendName2, additionalCount, onClick
}) => {
    return (
        <div 
            className="relative bg-cover bg-center shadow-md w-full max-w-sm h-64 cursor-pointer group"
            style={{ 
                backgroundImage: `url(${eventImage})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
                width: '325px',  // Adjusted width
                height: '200px', // Adjusted height
            }}
            onClick={onClick}

        >   
            <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-30 transition-opacity duration-300"></div> {/* Increased opacity */}
            <div className="absolute bottom-0 left-0 right-0 p-6 pl-3"> {/* Adjusted positioning */}
                <h2 className="text-xl font-bold text-white drop-shadow-lg">{eventName}</h2> {/* Increased text size and added shadow */}
                <p className="text-sm text-gray-300 drop-shadow-md">{eventDate}</p> {/* Increased text size and added shadow */}
                <p className="text-sm text-gray-300 drop-shadow-md">{eventLocation}</p> {/* Increased text size and added shadow */}
                
                {/* for the two small profile icons */}
                <SmallProfileImages
                    friendImage1={friendImage1}
                    friendImage2={friendImage2}
                    friendName1={friendName1}
                    friendName2={friendName2}
                    additionalCount={additionalCount}
                />
                
            </div>
        </div>
    );
};

export default EventCard;