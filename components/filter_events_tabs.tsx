import React, { useState } from 'react';

interface EventCardProps {
    name: string;
    onClick: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ name, onClick }) => {
    const [bgColor, setBgColor] = useState('#535353');


    const handleClick = () => {
        setBgColor(prevColor => prevColor === '#535353' ? '#1DB954' : '#535353'); // Toggle color
        onClick();
    };

    return (
        <div 
            className="flex flex-col items-center justify-center p-1 rounded-lg shadow-md mb-2 flex-1"
            style={{ backgroundColor: bgColor, minWidth: '35%' }} // Ensure minimum width for each tab
            onClick={handleClick}
        >
            <p className="text-white text-xs">{name}</p>
        </div>
    );
};

export default EventCard;