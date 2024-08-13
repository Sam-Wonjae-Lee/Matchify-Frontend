import { useEffect, useState } from "react";
import Head from "next/head";
import Background from "@/components/background";
import React from "react";
import { useRouter } from "next/router";
import RequestCard from "@/components/request_card";

const FriendRequests = () => {
    // Used for redirecting to another page
    const router = useRouter();

    const [accepted, setAccepted] = useState(false);
    const [requests, setRequests] = useState([
        { username: "Greg Wang", description: "Attended the same Imagine Dragons concert in June 24", image: "default_pfp.png"},
        { username: "Victor Yu", description: "Attended the same Imagine Dragons concert in June 24", image: "default_pfp.png"},
        { username: "Victor Yu", description: "Attended the same Imagine Dragons concert in June 24", image: "default_pfp.png" },
        { username: "Victor Yu", description: "Attended the same Imagine Dragons concert in June 24", image: "default_pfp.png" },
    ]);

    // Specified for home.tsx page
    const handleHomeRedirect = () => {
        router.push('/home');
    };

    const handleAccept = () => {
        if (!accepted) {
            setTimeout(() => setAccepted(false), 1000);
        }
        setAccepted(true);
        // TODO: Handle accept logic here
        console.log('Accepted');
    };

    const handleDecline = (index: number) => {
        let req_copy = [...requests];
        req_copy.splice(index, 1)
        setRequests(req_copy);
        // TODO: Handle decline logic here
        console.log('Declined ' + index);
    };

    return (
        <div className="min-h-screen w-screen" style={{ backgroundColor: '#282828' }}>
            <Head>
                <title>Friend Requests</title>
                <meta name="description" content="Profile Content"/>
                <link rel="icon" href="matchify_logo.svg" type="image/gif" sizes="16x16"></link>
            </Head>
            <div className="relative h-full w-full p-8 overflow-default">
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
                {requests && requests.length == 0 && (<div className="flex justify-center">
                    <div className="text-center text-2xl text-white mt-20 w-1/2"> You Have No Requests!</div>
                </div>)}
                {requests && requests.length > 0 && requests.map((request, index) => (
                    <RequestCard 
                        key={index}
                        image={request.image}
                        username={request.username} 
                        description={request.description} 
                        onAccept={handleAccept} 
                        onDecline={() => handleDecline(index)} 
                    />
                ))}
                {accepted && (<div className="fixed z-100 bottom-0 h-8 text-lg rounded-lg shadow-md w-[calc(100vw-4rem)] text-center bg-spotify-green mb-8">
                    Accepted Friend Request!
                </div>)}
            </div>
        </div>
    );
};

export default FriendRequests;