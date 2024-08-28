import { useEffect, useState } from "react";
import Head from "next/head";
import Background from "@/components/background";
import React from "react";
import { useRouter } from "next/router";
import RequestCard from "@/components/request_card";
import axios from "axios";

interface FriendRequest {
    username: string,
    description: string,
    image: string
}

const FriendRequests = () => {
    // Used for redirecting to another page
    const router = useRouter();

    const [accepted, setAccepted] = useState(false);
    const [requests, setRequests] = useState<FriendRequest[]>([]);

    useEffect(() => {
        const fetchFriendRequests = async () => {
            try {
                const response = await axios.post("http://localhost:8888/friend_request/get_user_friend_requests", {receiverID: sessionStorage.getItem("userId")});
                const friendRequests = response.data.map((request: { sender: string, profile_pic: string}) => ({
                    username: request.sender,
                    description: "Hey! I'd like to be your friend.",
                    image: request.profile_pic
                }));
                setRequests(friendRequests);
            } catch (error) {
                console.error("Failed to fetch friend requests:", error);
            }
        };

        fetchFriendRequests();
    }, []);

    // Specified for home.tsx page
    const handleHomeRedirect = () => {
        router.push('/home');
    };

    const handleAccept = async (index: number) => {
        if (!accepted) {
            setTimeout(() => setAccepted(false), 1000);
        }
        setAccepted(true);
        let req_copy = [...requests];
        req_copy.splice(index, 1)
        setRequests(req_copy);

        const id = sessionStorage.getItem("userId");
        const response = await axios.post("http://localhost:8888/request_decision/accept", {receiver_id: id, sender_id: requests[index].username})
        console.log('Accepted');
    };

    const handleDecline = async (index: number) => {
        let req_copy = [...requests];
        req_copy.splice(index, 1)
        setRequests(req_copy);
        
        const id = sessionStorage.getItem("userId");
        const response = await axios.post("http://localhost:8888/request_decision/decline", {receiver_id: id, sender_id: requests[index].username})
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
                    Friend Requests ({requests.length})
                </h1>

                {/* If there's no friend requests left */}
                {requests && requests.length == 0 && (<div className="flex justify-center">
                    <div className="text-center text-2xl text-white mt-20 w-1/2"> You Have No Requests!</div>
                </div>)}

                {requests && requests.length > 0 && requests.map((request, index) => (
                    <RequestCard 
                        key={index}
                        image={request.image}
                        username={request.username} 
                        description={request.description} 
                        onAccept={() => handleAccept(index)} 
                        onDecline={() => handleDecline(index)} 
                    />
                ))}

                {/* Accepted Popup */}
                {accepted && (
                    <div className="fixed z-100 bottom-0 h-16 text-lg rounded-lg shadow-md w-[calc(100vw-4rem)] text-center bg-spotify-green text-white mb-8 flex items-center justify-center">
                        <span>Accepted Request!</span>
                        <img src="/white_checkmark.svg" alt="Accepted" className="h-6 w-6 ml-2" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default FriendRequests;