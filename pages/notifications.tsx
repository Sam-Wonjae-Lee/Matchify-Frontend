import { useEffect, useState } from "react";
import Head from "next/head";
import Background from "@/components/background";
import React from "react";
import { useRouter } from "next/router";
import NotificationCard from '@/components/notification_card';

const NotificationsPage = () => {
    const router = useRouter();

    const handleHomeRedirect = () => {
        router.push('/home');
    };

    const handleFriendRequestRedirect = () => {
        router.push('/friend_requests');
    };

    // Hard coded notifications
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
        <div className="min-h-screen w-full flex items-center justify-center" style={{ backgroundColor: '#1C1C1C' }}>
            {/* Container scaled down by ~67% to match the zoom level where it fits */}
            <div className="w-full h-screen sm:h-[565px] sm:w-[261px] bg-[#282828] relative">
                <div className="p-4 flex flex-col h-full">
                    {/* Back Arrow */}
                    <button className="mb-4" onClick={handleHomeRedirect}>
                        <img src="/left_arrow.svg" alt="Left Arrow" className="w-8 h-8 sm:w-8 sm:h-8 lg:w-6 lg:h-6" />
                    </button>

                    <Head>
                        <title>Notifications</title>
                        <meta name="description" content="Notifications"/>
                        <link rel="icon" href="matchify_logo.svg" type="image/gif" sizes="16x16"></link>
                    </Head>
                    
                    <h1 className="font-bold text-2xl sm:text-2xl lg:text-base text-white mb-4">
                        Notifications ({notifications.length})
                    </h1>

                    {/* View Requests Button */}
                    <button 
                        className="bg-spotify-green text-white py-2 px-3 rounded-lg shadow-md flex items-center justify-center mb-4"
                        onClick={handleFriendRequestRedirect}
                    >
                        <span className="font-semibold text-base sm:text-base lg:text-sm">View Requests</span>
                        <img src="/heart_icon.svg" alt="Heart Icon" className="ml-2 w-4 h-4" />
                    </button>
                    
                    {/* Notifications List */}
                    <div className="flex-grow space-y-2">
                        {notifications.map(notification => (
                            <div 
                                key={notification.id} 
                                className="bg-[#3E3E3E] rounded-lg p-3 flex items-center justify-between"
                            >
                                <div className="flex items-center">
                                    <img src={notification.iconPath} alt="Icon" className="w-4 h-4 mr-2" />
                                    <span className="text-white text-base sm:text-base lg:text-xs">{notification.message}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Delete All Notifications Button */}
                    <div className="mt-auto pt-4">
                        <button 
                            className="w-full bg-red-500 text-white py-2 px-3 rounded-lg shadow-md flex items-center justify-center"
                            onClick={handleDeleteAll}
                        >
                            <span className="font-semibold text-base sm:text-base lg:text-sm">Delete All Notifications</span>
                            <img src="/trashcan_icon.svg" alt="Trash Can Icon" className="ml-2 w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationsPage;