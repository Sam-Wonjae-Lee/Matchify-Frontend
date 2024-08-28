import { useEffect, useState } from "react";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";

const Chat = () => {
    // Used for redirecting to another page
    const router = useRouter();

    const handleCreateNewChat = () => {
        router.push('/create_new_chat');
    };

    return (
        <div className="min-h-screen w-screen" style={{ backgroundColor: '#282828' }}>
            <Head>
                <title>Create New Chat</title>
                <meta name="description" content="Profile Content"/>
                <link rel="icon" href="matchify_logo.svg" type="image/gif" sizes="16x16"></link>
            </Head>
            <div className="relative h-full w-full p-8 overflow-default">
                <header className="flex items-center mb-2">
                    {/* Back Arrow */}
                    <button onClick={handleCreateNewChat}>
                        <img src="/left_arrow.svg" alt="Left Arrow" className="w-8 h-8"
                            // Hover animation
                            style={{ transition: 'filter 0.3s ease' }}
                            onMouseEnter={(e) => e.currentTarget.style.filter = 'invert(35%) sepia(99%) saturate(748%) hue-rotate(86deg) brightness(92%) contrast(101%)'}
                            onMouseLeave={(e) => e.currentTarget.style.filter = 'none'}
                        />
                    </button>
                    {/* Profile Button */}
                    <img src={""} alt="Profile Icon" className="z-10 w-[10vw] h-[10vw] rounded-full border-2 border-spotify-green object-cover ml-4" />
                    
                    <h1 className="text-white font-bold ml-4">Janet Tu</h1>
                </header>
            </div>
            <hr style={{ border: '1px solid #ccc', margin: '10px 0', width: '100%' }} />
        </div>
    );
};

export default Chat;