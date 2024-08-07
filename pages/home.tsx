import { useEffect, useState } from "react";
import Head from "next/head";
import Background from "@/components/background";
import { useRouter } from "next/router";
import UserCard from "@/components/user_card";

const Home = () => {
    // Used for redirecting to another page
    const router = useRouter();

    // Redirects for friend_requests.tsx page
    const handleFriendRequestsRedirect = () => {
        router.push('/friend_requests');
    }

    // Redirects for notifications.tsx page
    const handleNotificationsRedirect = () => {
        router.push('/notifications');
    }

    const [activeTab, setActiveTab] = useState('home');

    // For changing the page text on top left
    const getTabTitle = () => {
        switch (activeTab) {
            case 'home':
                return 'Home';
            case 'events':
                return 'Events';
            case 'friends':
                return 'Friends';
            case 'messages':
                return 'Messages';
            default:
                return 'Home';
        }
    };
    const users = [
        { profilePicture: "/default_pfp.png", username: "John Doe", songName: "Memories by Conan Gray" },
        { profilePicture: "/default_pfp.png", username: "Jane Doe", songName: "teenage dream by Olivia Rodrigo" },
        { profilePicture: "/default_pfp.png", username: "Jack", songName: "bandaids by Keshi" },
        { profilePicture: "/default_pfp.png", username: "Jack", songName: "bandaids by Keshi" },
        { profilePicture: "/default_pfp.png", username: "Jack", songName: "bandaids by Keshi" },
    ];

    return (
        <div className="h-screen w-screen" style={{ backgroundColor: '#282828' }}>
            <Head>
                <title>{getTabTitle()}</title>
                <meta name="description" content="Home Screen"/>
                <link rel="icon" href="matchify_logo.svg" type="image/gif" sizes="16x16"></link>
            </Head>
            <div className="h-full w-full p-8">
                <div className="mb-4 flex justify-between items-center">
                    <p className="text-spotify-green font-bold text-2xl">{getTabTitle()}</p>
                    <div className="flex space-x-4">
                        <img src="/heart_icon.svg" alt="Heart Icon" className="w-6 h-6"
                            style={{ transition: 'filter 0.3s ease' }}
                            onMouseEnter={(e) => e.currentTarget.style.filter = 'invert(35%) sepia(99%) saturate(748%) hue-rotate(86deg) brightness(92%) contrast(101%)'}
                            onMouseLeave={(e) => e.currentTarget.style.filter = 'none'}
                            onClick={handleFriendRequestsRedirect}
                        />
                        <img src="/bell_icon.svg" alt="Bell Icon" className="w-6 h-6"
                            style={{ transition: 'filter 0.3s ease' }}
                            onMouseEnter={(e) => e.currentTarget.style.filter = 'invert(35%) sepia(99%) saturate(748%) hue-rotate(86deg) brightness(92%) contrast(101%)'}
                            onMouseLeave={(e) => e.currentTarget.style.filter = 'none'}
                            onClick={handleNotificationsRedirect}
                        />
                        <img src="/default_pfp_v2.png" alt="Profile Icon" className="w-7 h-8"/>
                    </div>
                </div>

                {/* Home Page */}
                {activeTab === 'home' && 
                <div className="flex overflow-x-auto no-scrollbar space-x-4">
                    {users.map((user, index) => (
                        <div key={index} className="flex-shrink-0">
                            <UserCard 
                                profilePicture={user.profilePicture} 
                                username={user.username} 
                                songName={user.songName} 
                            />
                        </div>
                    ))}
                </div>}
                
                {/* Events Page */}
                {activeTab === 'events' && 
                <div className="flex justify-center mt-4">
                    <div className="flex items-center bg-gray-700 rounded-md px-4 py-2 w-80">
                        <img src="/search_icon.svg" alt="Search Icon" className="w-4 h-4 mr-2" />
                        <input 
                            type="text" 
                            placeholder="Search Events" 
                            // Todo: change color to the correct grey
                            className="bg-gray-700 outline-none placeholder-gray-400 text-white w-full" 
                        />
                    </div>
                </div>}
                
                {/* Friends Page */}
                {activeTab === 'friends' && 
                <div className="flex justify-center mt-4">
                    <div className="flex items-center bg-gray-700 rounded-md px-4 py-2 w-80">
                        <img src="/search_icon.svg" alt="Search Icon" className="w-4 h-4 mr-2" />
                        <input 
                            type="text" 
                            placeholder="Search By Name" 
                            className="bg-gray-700 outline-none placeholder-gray-400 text-white w-full" 
                        />
                    </div>
                </div>}

                {/* Messages Page */}
                {activeTab === 'messages' && 
                <div className="flex justify-center mt-4">
                    <div className="flex items-center bg-gray-700 rounded-md px-4 py-2 w-80">
                        <img src="/search_icon.svg" alt="Search Icon" className="w-4 h-4 mr-2" />
                        <input 
                            type="text" 
                            placeholder="Search By Name" 
                            className="bg-gray-700 outline-none placeholder-gray-400 text-white w-full" 
                        />
                    </div>
                </div>}
            </div>

            {/* Navigation Bar */}
            <div className="fixed bottom-0 w-full bg-gray-800 p-4">
                <div className="flex justify-around">
                    <div className="flex flex-col items-center" onClick={() => setActiveTab('home')}>
                        <img src="/home_icon.svg" alt="Home Icon" className="w-6 h-6"
                            style={{ 
                                transition: 'filter 0.3s ease',
                                filter: activeTab === 'home' ? 'invert(35%) sepia(99%) saturate(748%) hue-rotate(86deg) brightness(92%) contrast(101%)' : 'none'
                            }}
                        />
                        <p className={`text-xs ${activeTab === 'home' ? 'text-spotify-green' : 'text-white'}`}>Home</p>
                    </div>
                    <div className="flex flex-col items-center" onClick={() => setActiveTab('events')}>
                        <img src="/event_icon.svg" alt="Event Icon" className="w-6 h-6"
                            style={{ 
                                transition: 'filter 0.3s ease',
                                filter: activeTab === 'events' ? 'invert(35%) sepia(99%) saturate(748%) hue-rotate(86deg) brightness(92%) contrast(101%)' : 'none'
                            }}
                        />
                        <p className={`text-xs ${activeTab === 'events' ? 'text-spotify-green' : 'text-white'}`}>Events</p>
                    </div>
                    <div className="flex flex-col items-center" onClick={() => setActiveTab('friends')}>
                        <img src="/heart_outline_icon.svg" alt="Heart Icon" className="w-6 h-6"
                            style={{ 
                                transition: 'filter 0.3s ease',
                                filter: activeTab === 'friends' ? 'invert(35%) sepia(99%) saturate(748%) hue-rotate(86deg) brightness(92%) contrast(101%)' : 'none'
                            }}
                        />
                        <p className={`text-xs ${activeTab === 'friends' ? 'text-spotify-green' : 'text-white'}`}>Friends</p>
                    </div>
                    <div className="flex flex-col items-center" onClick={() => setActiveTab('messages')}>
                        <img src="/message_icon.svg" alt="Message Icon" className="w-6 h-6"
                            style={{ 
                                transition: 'filter 0.3s ease',
                                filter: activeTab === 'messages' ? 'invert(35%) sepia(99%) saturate(748%) hue-rotate(86deg) brightness(92%) contrast(101%)' : 'none'
                            }}
                        />
                        <p className={`text-xs ${activeTab === 'messages' ? 'text-spotify-green' : 'text-white'}`}>Messages</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;