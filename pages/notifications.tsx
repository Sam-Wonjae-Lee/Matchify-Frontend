import { useEffect, useState } from "react";
import Head from "next/head";
import Background from "@/components/background";
import React from "react";
import { useRouter } from "next/router";
import NotificationCard from '@/components/notification_card';

const NotificationsPage = () => {
    // Used for redirecting to another page
    const router = useRouter();

    // Specified for home.tsx page
    const handleHomeRedirect = () => {
        router.push('/home');
    };

    const handleFriendRequestRedirect = () => {
        router.push('/friend_requests');
    };

    const [notifications, setNotifications] = useState([
        { id: 1, iconPath: '/heart_icon.svg', message: 'You are now friends with Janet Yu' },
        { id: 2, iconPath: '/event_icon.svg', message: 'There is an upcoming concert' },
    ]);

    const handleDeleteAll = () => {
        setNotifications([]);
    };

    const handleDelete = (id: number) => {
        setNotifications(notifications.filter(notification => notification.id !== id));
    };

    return (
        <div className="min-h-screen w-full p-8 flex flex-col" style={{ backgroundColor: '#282828' }}>
            <Head>
                <title>Notifications</title>
                <meta name="description" content="Notifications"/>
                <link rel="icon" href="matchify_logo.svg" type="image/gif" sizes="16x16"></link>
            </Head>
            {/* Back Arrow */}
            <button className="mb-4" onClick={handleHomeRedirect}>
                <img src="/left_arrow.svg" alt="Left Arrow" className="w-8 h-8"
                    // Hover animation
                    style={{ transition: 'filter 0.3s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.filter = 'invert(35%) sepia(99%) saturate(748%) hue-rotate(86deg) brightness(92%) contrast(101%)'}
                    onMouseLeave={(e) => e.currentTarget.style.filter = 'none'}
                />
            </button>
            <h1 className="font-bold text-2xl z-10 text-white mb-4">
                Notifications ({notifications.length})
            </h1>

            {/* View Requests Button */}
            <div className="flex justify-center mt-4">
                <button className="font-bold bg-spotify-green text-white py-4 px-6 rounded-lg shadow-md flex items-center justify-center w-full"
                    onClick={handleFriendRequestRedirect}
                >
                    View Requests
                    <img src="/heart_icon.svg" alt="Heart Icon" className="ml-4 w-8 h-8" />
                </button>
            </div>
            
            {/* flex-grow pushes the delete all button to the bottom */}
            <div className="flex-grow mt-4">
                {notifications.map(notification => (
                    <NotificationCard
                        key={notification.id}
                        iconPath={notification.iconPath}
                        message={notification.message}
                        onDelete={() => handleDelete(notification.id)}
                    />
                ))}
            </div>

            {/* Delete All Notifications Button */}
            <div className="flex justify-center mt-4">
                <button className="font-bold bg-red-500 text-white py-4 px-6 rounded-lg shadow-md flex items-center justify-center w-full"
                    onClick={handleDeleteAll}
                >
                    Delete All Notifications
                    <img src="/trashcan_icon.svg" alt="Trash Can Icon" className="ml-4 w-8 h-8" />
                </button>
            </div>
        </div>
    );
};

export default NotificationsPage;