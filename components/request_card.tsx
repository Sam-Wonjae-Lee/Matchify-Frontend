import React from "react";

// Component for friend requests
interface RequestCardProps {
    image: string
    username: string;
    description: string;
    onAccept: () => void;
    onDecline: () => void;
}

const RequestCard: React.FC<RequestCardProps> = ({ username, description, image, onAccept, onDecline }) => {
    return (
        <div className="p-4 sm:p-4 lg:p-2 rounded-lg shadow-md mb-4" style={{ backgroundColor: '#535353' }}>
            <div className="flex items-center space-x-2">
                <img src={image} className="h-12 w-12 sm:h-12 sm:w-12 lg:h-10 lg:w-10 rounded-full"></img>
                <h2 className="text-xl font-bold text-white">{username}</h2>
            </div>
            <p className="text-base sm:text-base lg:text-xs mt-2" style={{ color: '#DADEDB' }}>{description}</p>
            <div className="mt-4 flex space-x-4">
                <button 
                    className="bg-red-500 text-white text-base sm:text-base lg:text-sm px-4 py-2 sm:px-4 sm:py-2 lg:px-2 lg:py-1 rounded-3xl hover:bg-red-600"
                    onClick={onDecline}
                >
                    Decline
                </button>

                <button 
                    className="bg-green-500 text-white text-base sm:text-base lg:text-sm px-4 py-2 sm:px-4 sm:py-2 lg:px-2 lg:py-1 rounded-3xl hover:bg-green-600"
                    onClick={onAccept}
                >
                    Accept
                </button>
            </div>
        </div>
    );
};

export default RequestCard;