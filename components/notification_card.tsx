import React from "react";

// Component for notifications
interface NotificationCardProps {
    // TODO: May need to add date to when the notification was sent
    iconPath: string;   // Path to icon image
    message: string;    // Notification message
    // onDelete: () => void;   // For deleting current notification
}

const NotificationCard: React.FC<NotificationCardProps> = ({ iconPath, message }) => {
    return (
        <div className="p-4 rounded-lg shadow-md mb-4 relative" style={{ backgroundColor: '#535353' }}>
            <button 
                // onClick={onDelete} 
                className="absolute top-2 right-2 text-white"
                aria-label="Delete notification"
            >
                &times;
            </button>
            <div className="flex items-center">
                <img src={iconPath} alt="Notification Icon" className="w-8 h-8 mr-4" />
                <p className="text-white">{message}</p>
            </div>
        </div>
    );
};

export default NotificationCard;