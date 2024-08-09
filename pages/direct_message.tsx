import { useEffect, useState } from "react";
import Head from "next/head";
import Background from "@/components/background";
import React from "react";
import { useRouter } from "next/router";

const DirectMessage = () => {
    // Used for redirecting to another page
    const router = useRouter();

    // Specified for home.tsx page
    const handleHomeRedirect = () => {
        router.push('/home');
    };

    const [message, setMessage] = useState('');

    return (
        <div className="h-full w-full p-8" style={{ backgroundColor: '#282828' }}>
            <Head>
                <title>Direct Message</title>
                <meta name="description" content="Direct Message"/>
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

            {/* Message Bar */}
            <div className="fixed bottom-0 left-0 right-0 flex items-center p-4 bg-[#282828] rounded-lg">
                <div className="flex items-center justify-center w-10 h-10 bg-[#1DB954] rounded-full mr-4">
                    <img src="/camera_icon.svg" alt="Camera Icon" className="w-6 h-6 rounded-xl"
                        style={{ transition: 'filter 0.3s ease' }}
                    />
                </div>
                <input 
                    type="text" 
                    placeholder="Message..." 
                    className="flex-grow p-2 bg-[#535353] text-white rounded-lg outline-none"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                {/* 
                    trim is used to check if input field is empty which renders the microphone and image icons.
                    If input field has text, render the send icon.
                */}
                {message.trim() === '' ? (
                    <div className="flex items-center space-x-4 ml-4">
                        <img src="/microphone_icon.svg" alt="Microphone Icon" className="w-6 h-6"
                            style={{ transition: 'filter 0.3s ease' }}
                        />
                        <img src="/image_icon.svg" alt="Image Icon" className="w-6 h-6"
                            style={{ transition: 'filter 0.3s ease' }}
                        />
                    </div>
                ) : (
                    <div className="flex items-center justify-center w-10 h-10 bg-[#1DB954] rounded-full ml-4">
                        <img src="/send_icon.svg" alt="Send Icon" className="w-6 h-6"
                            style={{ transition: 'filter 0.3s ease' }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default DirectMessage;