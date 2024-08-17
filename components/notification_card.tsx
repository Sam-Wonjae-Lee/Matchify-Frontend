import React from "react";
import { useState } from "react";

// Component for notifications
interface NotificationCardProps {
    // TODO: May need to add date to when the notification was sent
    iconPath: string;   // Path to icon image
    message: string;    // Notification message
}

const NotificationCard: React.FC<NotificationCardProps> = ({ iconPath, message }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const maxDragDistance = -100; // Maximum distance to drag to the left

    const handleMouseDown = (e: React.MouseEvent) => {
        setDragging(true);
        setStartX(e.clientX - position.x);
    };

    // Needed for smaller dimensions when dragging
    const handleTouchStart = (e: React.TouchEvent) => {
        setDragging(true);
        setStartX(e.touches[0].clientX - position.x);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (dragging) {
            const newX = e.clientX - startX;
            if (newX <= 0 && newX >= maxDragDistance) {
                setPosition({ x: newX, y: 0 });
            }
        }
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (dragging) {
            const newX = e.touches[0].clientX - startX;
            if (newX <= 0 && newX >= maxDragDistance) {
                setPosition({ x: newX, y: 0 });
            }
        }
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    const handleTouchEnd = () => {
        setDragging(false);
    };

    React.useEffect(() => {
        if (dragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchmove', handleTouchMove);
            window.addEventListener('touchend', handleTouchEnd);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [dragging]);

    return (
        <div
            className="p-4 rounded-lg shadow-md mb-4 relative"
            style={{ backgroundColor: '#535353', transform: `translateX(${position.x}px)` }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
        >
            <div className="flex items-center">
                <img src={iconPath} alt="Notification Icon" className="w-8 h-8 mr-4" />
                <p className="text-white">{message}</p>
            </div>
        </div>
    );
};

export default NotificationCard;