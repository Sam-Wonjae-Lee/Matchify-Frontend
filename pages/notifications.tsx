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

    const [notifications, setNotifications] = useState([
        { iconPath: '/heart_icon.svg', message: 'You are now friends with Janet Yu' },
        { iconPath: '/event_icon.svg', message: 'There is an upcoming concert' },
        // Add more notifications as needed
    ]);

    return (
        <div className="h-full w-full p-8" style={{ backgroundColor: '#282828' }}>
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
            {notifications.map((notification, index) => (
                <NotificationCard 
                    key={index}
                    iconPath={notification.iconPath}
                    message={notification.message}
                />
            ))}
        </div>
    );
};

export default NotificationsPage;