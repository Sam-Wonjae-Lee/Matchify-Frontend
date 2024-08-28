import { useEffect, useState } from "react";
import Head from "next/head";
import Background from "@/components/background";
import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import SearchBar from "@/components/search_bar";
import CreateNewGroupChatCard from "@/components/create_new_group_chat_card";


const CreateNewGroupChat = () => {
    // Used for redirecting to another page
    const router = useRouter();

    const [messagesSearch, setMessagesSearch] = useState('');
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

    const handleCreateNewChat = () => {
        router.push('/create_new_chat');
    };

    const handleMessagesSearch = () => {
        console.log('Messages Search:', messagesSearch);
        // TODO: Handle search logic here
    };

    function setSearchQuery(value: string): void {
        throw new Error("Function not implemented.");
    }

    const handleUserSelect = (name: string) => {
        setSelectedUsers((prevSelectedUsers) =>
            prevSelectedUsers.includes(name)
                ? prevSelectedUsers.filter((user) => user !== name)
                : [...prevSelectedUsers, name]
        );
    };

    return (
        <div className="min-h-screen w-screen create-new-group-chat" style={{ backgroundColor: '#282828' }}>
            <Head>
                <title>Create New Group Chat</title>
                <meta name="description" content="Profile Content"/>
                <link rel="icon" href="matchify_logo.svg" type="image/gif" sizes="16x16"></link>
            </Head>
            <div className="relative h-full w-full p-8 overflow-default">
                {/* Back Arrow */}
                <button className="mb-4" onClick={handleCreateNewChat}>
                    <img src="/left_arrow.svg" alt="Left Arrow" className="w-8 h-8"
                        // Hover animation
                        style={{ transition: 'filter 0.3s ease' }}
                        onMouseEnter={(e) => e.currentTarget.style.filter = 'invert(35%) sepia(99%) saturate(748%) hue-rotate(86deg) brightness(92%) contrast(101%)'}
                        onMouseLeave={(e) => e.currentTarget.style.filter = 'none'}
                    />
                </button>
                <h1 className="font-bold text-2xl z-10 text-white mb-12">
                    Create New Group Chat
                </h1>

                <SearchBar
                    placeholder="Search"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleMessagesSearch();
                        }
                    }}
                />

                <h1 className="font-bold text-xl z-10 text-white mt-12">
                    Start a chat with:
                </h1>

                {/* Example usage of CreateNewChatCard */}
                <div className="mt-4">
                    <CreateNewGroupChatCard
                        pfp="/path/to/profile_picture.jpg"
                        name="John Doe"
                        selectState={selectedUsers.includes("John Doe")}
                        onSelect={() => handleUserSelect("John Doe")}
                    />
                    <CreateNewGroupChatCard
                        pfp="/path/to/profile_picture2.jpg"
                        name="Jane Smith"
                        selectState={selectedUsers.includes("Jane Smith")}
                        onSelect={() => handleUserSelect("Jane Smith")}
                    />
                </div>
                
            </div>
        </div>
    );
};

export default CreateNewGroupChat;