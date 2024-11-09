import React from "react";
import { useState } from "react";

interface NotificationCardProps {
    iconPath: string;
    message: string;
    onDelete: () => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ iconPath, message, onDelete}) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const maxDragDistance = -50;

    const handleMouseDown = (e: React.MouseEvent) => {
        setDragging(true);
        setStartX(e.clientX - position.x);
    };

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
        <div className="rounded-lg relative" style={{ backgroundColor: 'red' }}>
            <div
                className="py-2 px-3 rounded-lg shadow-md flex items-center justify-between relative z-10"
                style={{ backgroundColor: '#535353', transform: `translateX(${position.x}px)` }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
            >
                <div className="flex items-center">
                    <img 
                        src={iconPath} 
                        alt="Notification Icon" 
                        className="w-4 h-4 mr-2"
                        style={{ filter: 'invert(48%) sepia(92%) saturate(749%) hue-rotate(85deg) brightness(92%) contrast(92%)' }} 
                    />
                    <p className="text-white text-sm">{message}</p>
                </div>
            </div>
            <div className="absolute right-0 top-0 bottom-0 flex items-center pr-3 z-0">
                <img
                    src="/delete_icon.svg"
                    alt="Delete Icon"
                    className="w-4 h-4 cursor-pointer"
                    onClick={onDelete}
                />
            </div>
        </div>
    );
};

export default NotificationCard;