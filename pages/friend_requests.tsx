import { useEffect, useState } from "react";
import Head from "next/head";
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
    const router = useRouter();
    const [accepted, setAccepted] = useState(false);
    const [requests, setRequests] = useState<FriendRequest[]>([]);

    useEffect(() => {
        const fetchFriendRequests = async () => {
            try {
                const response = await axios.post("http://localhost:8888/friend_request/get_user_friend_requests", { receiverID: sessionStorage.getItem("userId") });
                const friendRequests = response.data.map((request: { sender: string, profile_pic: string }) => ({
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

    const handleHomeRedirect = () => {
        router.push('/home');
    };

    const handleAccept = async (index: number) => {
        if (!accepted) {
            setTimeout(() => setAccepted(false), 1000);
        }
        setAccepted(true);
        let req_copy = [...requests];
        req_copy.splice(index, 1);
        setRequests(req_copy);

        const id = sessionStorage.getItem("userId");
        await axios.post("http://localhost:8888/request_decision/accept", { receiver_id: id, sender_id: requests[index].username });
        console.log('Accepted');
    };

    const handleDecline = async (index: number) => {
        let req_copy = [...requests];
        req_copy.splice(index, 1);
        setRequests(req_copy);

        const id = sessionStorage.getItem("userId");
        await axios.post("http://localhost:8888/request_decision/decline", { receiver_id: id, sender_id: requests[index].username });
        console.log('Declined ' + index);
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center" style={{ backgroundColor: '#1C1C1C' }}>
            {/* Container scaled down to mimic mobile view */}
            <div className="w-[261px] h-[565px] bg-[#282828] relative">
                <div className="p-4 flex flex-col h-full">
                    {/* Back Arrow */}
                    <button className="mb-4" onClick={handleHomeRedirect}>
                        <img src="/left_arrow.svg" alt="Left Arrow" className="w-4 h-4" />
                    </button>

                    <Head>
                        <title>Friend Requests</title>
                        <meta name="description" content="Profile Content" />
                        <link rel="icon" href="matchify_logo.svg" type="image/gif" sizes="16x16" />
                    </Head>

                    <h1 className="font-bold text-base text-white mb-4">
                        Friend Requests ({requests.length})
                    </h1>

                    {/* If there's no friend requests left */}
                    {requests && requests.length === 0 && (
                        <div className="flex justify-center">
                            <div className="text-center text-white text-base mt-20">You Have No Requests!</div>
                        </div>
                    )}

                    {/* Friend Requests List */}
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
                        <div className="fixed z-100 bottom-0 h-16 text-sm rounded-lg shadow-md w-[calc(100vw-4rem)] text-center bg-spotify-green text-white mb-4 flex items-center justify-center">
                            <span>Accepted Request!</span>
                            <img src="/white_checkmark.svg" alt="Accepted" className="h-5 w-5 ml-2" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FriendRequests;
