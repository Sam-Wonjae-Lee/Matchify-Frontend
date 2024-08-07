import { useEffect, useState } from "react";
import Head from "next/head";
import Background from "@/components/background";
import React from "react";
import { useRouter } from "next/router";
import RequestCard from "@/components/request_card";

const FriendRequests = () => {
    // Used for redirecting to another page
    const router = useRouter();

    // Specified for home.tsx page
    const handleHomeRedirect = () => {
        router.push('/home');
    };

    const handleAccept = () => {
        // TODO: Handle accept logic here
        console.log('Accepted');
    };

    const handleDecline = () => {
        // TODO: Handle decline logic here
        console.log('Declined');
    };

    const requests = [
        { username: "Greg Wang", description: "Attended the same Imagine Dragons concert in June 24" },
        { username: "Victor Yu", description: "Attended the same Imagine Dragons concert in June 24" },
    ];

    return (
        <div className="min-h-screen w-screen" style={{ backgroundColor: '#282828' }}>
            <Head>
                <title>Friend Requests</title>
                <meta name="description" content="Profile Content"/>
                <link rel="icon" href="matchify_logo.svg" type="image/gif" sizes="16x16"></link>
            </Head>
            <div className="h-full w-full p-8">
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
                    Requests ({requests.length})
                </h1>
                {requests.map((request, index) => (
                    <RequestCard 
                        key={index}
                        username={request.username} 
                        description={request.description} 
                        onAccept={handleAccept} 
                        onDecline={handleDecline} 
                    />
                ))}
            </div>
        </div>
    );
};

export default FriendRequests;