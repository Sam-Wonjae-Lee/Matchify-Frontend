import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import { GetServerSideProps, NextPage } from 'next';
import Background from "@/components/background";

import { useRouter } from "next/router";
import UserCard from "@/components/user_card";
import FilterEventsTabs from "@/components/filter_events_tabs";
import EventCard from "@/components/event_card";
import ProfileCard from "@/components/profile_card";
import SearchBar from "@/components/search_bar";

import { AreYouSureCard, showAreYouSureCard } from "@/components/are_you_sure_card";

import axios from 'axios';
import { profile } from "console";
import FriendsPlaylistCard from "@/components/friends_playlist";

interface Friend {
    first_name: string,
    last_name: string,
    profile_pic: string,
    bio: string,
    user_id: string
}

const Home = () => {
    // Used for redirecting to another page
    const router = useRouter();

    // for search inputs
    const [eventSearch, setEventSearch] = useState('');
    const [headerText, setHeaderText] = useState('Your Events');

    const [friendSearch, setFriendSearch] = useState('');
    const [messagesSearch, setMessagesSearch] = useState('');

    type Tab = 'events' | 'friends' | 'home' | 'friends' | 'messages';
    const [activeTab, setActiveTab] = useState<Tab>('home');

    const [profilePicture, setProfilePicture] = useState<string | null>(null);

    const [suggestionState, setSuggestionState] = useState(true);

    const [recommendations, setRecommendations] = useState([]);

    const [friendMatches, setFriendMatches] = useState<Friend[]>([]);
    const [friendMatchesCopy, setFriendMatchesCopy] = useState<Friend[]>([]);

    const [friends, setFriends] = useState<Friend[]>([]);
    const [friendsCopy, setFriendsCopy] = useState<Friend[]>([]);

    const [areYouSureText, setAreYouSureText] = useState("");

    const [areYouSureFunc, setAreYouSureFunc] = useState(null);

    const initialLoadFriendMatches = useRef(true);
    const initialLoadFriend = useRef(true);

    // State for messages sub-tabs
    type MessagesSubTab = 'messages' | 'requests';
    const [activeMessagesSubTab, setActiveMessagesSubTab] = useState<MessagesSubTab>('messages');

    // Fetch concert recommendations
    // TODO: Implement the get the user's profile data from session storage and pass it to the API
    // theres still more to be done here
    // TODO: Implement the friends attending and number of people attending
    const fetchConcertRecommendations = async () => {
        const profileData = JSON.parse(sessionStorage.getItem("profileData") || "{}");
        console.log(profileData);
        profileData.id = 'a';
        profileData.name = 'a';
        if (profileData && profileData.id) {
            const response = await axios.post("http://localhost:8888/concert_recommendations", { user_id: profileData.id });
            console.log("response data:", response.data);

            if (response.data && response.data.success) {
                console.log("response.data.concerts:", response.data.concerts);
                setRecommendations(response.data.concerts); // Assuming the API returns a "concerts" array
                // console.log("your recs:", recommendations);
                sessionStorage.removeItem("profileData");
            }
        }
    };

    const getProfilePic = async () => {
        const id = sessionStorage.getItem("userId");
        const profile = await axios.get(`http://localhost:8888/user/get/${id}`);
        setProfilePicture(profile.data.profile_pic);
    };

    const getSuggestions = async () => {
        const response = await axios.post("http://localhost:8888/match/get_matches", { user_id: sessionStorage.getItem("userId") });
        setFriendMatches(response.data);
        if (initialLoadFriendMatches.current) {
            setFriendMatchesCopy(response.data);
            initialLoadFriendMatches.current = false;
        }
    };

    const getFriends = async () => {
        const id = sessionStorage.getItem("userId");
        const response = await axios.get(`http://localhost:8888/user/get_user_friends/${id}`);
        console.log(response.data);
        setFriends(response.data);
        if (initialLoadFriend.current) {
            setFriendsCopy(response.data);
            initialLoadFriend.current = false;
        }
    };

    useEffect(() => {
        getProfilePic();
        getFriends();
    }, []);

    useEffect(() => {
        if (activeTab === 'events') {
            fetchConcertRecommendations(); // Fetch recommendations when 'events' tab is active
        }
    }, [activeTab]);

    useEffect(() => {

        if (suggestionState) {
            getSuggestions();
        }
        else {
            getFriends();
        }

    }, [suggestionState]);

    // For handling event clicks
    const handleEventClick = (event: any) => {
        console.log('Event clicked:', event);
        // Destructure event details
        const { concert_id, concert_name, concert_date, concert_location, concert_image, venue, link} = event;

        // Navigate to event_details page with query parameters
        router.push({
            pathname: '/event_details',
            query: {
                concert_id, 
                concert_name,
                concert_date,
                concert_location,
                concert_image,
                venue,
                link

            }
        });
    };

    const handleEventSearch = () => {
        console.log('Event Search:', eventSearch);

        setHeaderText('Search Results');
        // TODO: Handle event search logic here
    };

    const handleFriendSearch = () => {
        console.log('Friend Search:', friendSearch);
        // TODO: Handle search logic here
    };

    const handleMessagesSearch = () => {
        console.log('Messages Search:', messagesSearch);
        // TODO: Handle search logic here
    };

    // Redirects for friend_requests.tsx page
    const handleFriendRequestsRedirect = () => {
        router.push('/friend_requests');
    }

    // Redirects for notifications.tsx page
    const handleNotificationsRedirect = () => {
        router.push('/notifications');
    }

    // Redirects for notifications.tsx page
    const handleFriendsRedirect = () => {
        router.push('/friends');
    }

    const handleProfileRedirect = () => {
        // HERE WE NEED TO ACCESS SESSION STORAGE
        const user_id = sessionStorage.getItem("userId") || "Anon"
        router.push('/profile/' + user_id);
    }

    const handleCreateNewChat = () => {
        router.push('/create_new_chat');
    }

    const handleAttendingTab = () => {
        console.log('Attending pressed!');
    };

    const handleLocationTab = () => {
        console.log('Location pressed!');
    }

    const handleDateTab = () => {
        console.log('Date pressed!');
    }

    const handleArtistTab = () => {
        console.log('Artist pressed!');
    }

    const handleGenreTab = () => {
        console.log('Genre pressed!');
    }

    const handleFriendsAttendingTab = () => {
        console.log('Friends Attending pressed!');
    }

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
        { profilePicture: "/default_pfp.png", username: "Top G", songName: "I love smoking" },
        { profilePicture: "/default_pfp.png", username: "Jane Doe", songName: "teenage dream by Olivia Rodrigo" },
        { profilePicture: "/default_pfp.png", username: "Jack", songName: "bandaids by Keshi" },
        { profilePicture: "/default_pfp.png", username: "Jack", songName: "bandaids by Keshi" },
        { profilePicture: "/default_pfp.png", username: "Jack", songName: "bandaids by Keshi" },
    ];

    function setSearchQuery(value: string): void {

        console.log("VALUE: " + value);

        if (!value || value == "") {
            setFriendMatchesCopy(friendMatches);
            setFriendsCopy(friends);
        }

        const searchFriendMatches: Friend[] = []
        const searchFriends: Friend[] = []

        const regex = new RegExp(value, 'i');
        let index;

        for (const friend of friendMatches) {
            const fullName = friend.first_name + " " + friend.last_name;
            index = fullName.search(regex);
            if (index !== -1) {
                searchFriendMatches.push(friend);
                continue;
            }

            index = friend.bio.search(regex);
            if (index !== -1) {
                searchFriendMatches.push(friend);
                continue;
            }
        }

        for (const friend of friends) {
            const fullName = friend.first_name + " " + friend.last_name;
            index = fullName.search(regex);
            if (index !== -1) {
                searchFriends.push(friend);
                continue;
            }

            index = friend.bio.search(regex);
            if (index !== -1) {
                searchFriends.push(friend);
                continue;
            }
        }
        setFriendMatchesCopy(searchFriendMatches);
        setFriendsCopy(searchFriends);
    }

    return (
        <div className="min-h-screen w-screen flex items-center justify-center bg-[#1C1C1C]">
            <div className="w-full h-screen sm:h-[565px] sm:w-[261px] bg-[#282828] relative overflow-hidden flex flex-col">
                <Head>
                    <title>{getTabTitle()}</title>
                    <meta name="description" content="Home Screen" />
                    <link rel="icon" href="matchify_logo.svg" type="image/gif" sizes="16x16"></link>
                </Head>

                {/* Header Section */}
                <div className="flex-none p-8 sm:p-8 lg:p-4">
                    <div className="mb-4 flex justify-between items-center">
                        <p className="text-spotify-green font-bold text-2xl">{getTabTitle()}</p>
                        <div className="flex space-x-4">
                            <img src="/heart_icon.svg" alt="Heart Icon" 
                                className="w-6 h-6 sm:w-6 sm:h-6 lg:w-5 lg:h-5"
                                style={{ transition: 'filter 0.3s ease' }}
                                onMouseEnter={(e) => e.currentTarget.style.filter = 'invert(35%) sepia(99%) saturate(748%) hue-rotate(86deg) brightness(92%) contrast(101%)'}
                                onMouseLeave={(e) => e.currentTarget.style.filter = 'none'}
                                onClick={handleFriendRequestsRedirect}
                            />
                            <img src="/bell_icon.svg" alt="Bell Icon" 
                                className="w-6 h-6 sm:w-6 sm:h-6 lg:w-5 lg:h-5"
                                style={{ transition: 'filter 0.3s ease' }}
                                onMouseEnter={(e) => e.currentTarget.style.filter = 'invert(35%) sepia(99%) saturate(748%) hue-rotate(86deg) brightness(92%) contrast(101%)'}
                                onMouseLeave={(e) => e.currentTarget.style.filter = 'none'}
                                onClick={handleNotificationsRedirect}
                            />
                            <img src={profilePicture ?? ''} 
                                alt="Profile Icon" 
                                className="z-10 w-[7vw] h-[7vw] sm:w-[7vw] sm:h-[7vw] lg:w-[2vw] lg:h-[2vw] rounded-full border-2 border-spotify-green object-cover" 
                                onClick={handleProfileRedirect} 
                            />
                        </div>
                    </div>
                    
                    {/* Search Bar Section */}
                    {(activeTab === 'events' || activeTab === 'friends' || activeTab === 'messages') && (
                        <div className="w-full px-4 sm:px-0">
                            <SearchBar
                                placeholder="Search"
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        activeTab === 'events' ? handleEventSearch() :
                                        activeTab === 'friends' ? handleFriendSearch() :
                                        handleMessagesSearch();
                                    }
                                }}
                            />
                        </div>
                    )}
                </div>

                {/* Main Content Section - Scrollable */}
                <div className="flex-1 overflow-y-auto">
                    <div className="px-8 sm:px-8 lg:px-4">
                        {/* Home Tab Content */}
                        {activeTab === 'home' && (
                            <div>
                                {friends && friends.length > 0 ? (
                                    <div className="flex overflow-x-auto no-scrollbar space-x-4">
                                        {friends.map((friend, index) => (
                                            <div key={index}>
                                                <UserCard
                                                    profilePicture={friend.profile_pic}
                                                    username={friend.first_name + " " + friend.last_name}
                                                    userId={friend.user_id}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="w-full text-white text-center font-bold mt-40">
                                        Go Make Some Friends!
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Events Tab Content */}
                        {activeTab === 'events' && (
                            <div className="flex flex-col items-center space-y-4 w-full">
                                <div className="flex overflow-x-auto no-scrollbar space-x-2 w-full">
                                    <FilterEventsTabs name="Location" onClick={handleLocationTab} />
                                    <FilterEventsTabs name="Date" onClick={handleDateTab} />
                                    <FilterEventsTabs name="Artist" onClick={handleArtistTab} />
                                    <FilterEventsTabs name="Genre" onClick={handleGenreTab} />
                                    <FilterEventsTabs name="Friends Attending" onClick={handleFriendsAttendingTab} />
                                    <FilterEventsTabs name="Attending" onClick={handleAttendingTab} />
                                </div>

                                <div className="w-full">
                                    <h1 className="text-2xl font-bold text-white">{headerText}</h1>
                                    <div className="flex flex-col items-center space-y-4 mt-4">
                                        {recommendations.length > 0 ? (
                                            recommendations.map((event: any) => (
                                                <div key={event.concert_id} className="w-full">
                                                    <EventCard
                                                        eventName={event.concert_name}
                                                        eventDate={event.concert_date}
                                                        eventLocation={event.concert_location}
                                                        eventImage={event.concert_image}
                                                        friendImage1={event.friendImage1}
                                                        friendImage2={event.friendImage2}
                                                        friendName1={event.friendName1}
                                                        friendName2={event.friendName2}
                                                        additionalCount={event.additionalCount}
                                                        onClick={() => handleEventClick(event)}
                                                    />
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-white">No events found</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Friends Tab Content */}
                        {activeTab === 'friends' && (
                            <div className="flex flex-col items-center mt-4">
                                <div className="w-full flex">
                                    <button
                                        onClick={() => setSuggestionState(true)}
                                        className={`w-1/2 h-[45px] sm:h-[45px] lg:h-[35px] rounded-l-md flex text-xs sm:text-xs lg:text-[10px] items-center justify-center text-white font-bold`}
                                        style={{ backgroundColor: suggestionState ? '#1DB954' : '#535353' }}
                                    >
                                        Matchify Suggestions
                                    </button>
                                    <button
                                        onClick={() => setSuggestionState(false)}
                                        className={`w-1/2 h-[45px] sm:h-[45px] lg:h-[35px] rounded-r-md flex text-xs sm:text-xs lg:text-[10px] items-center justify-center text-white font-bold`}
                                        style={{ backgroundColor: !suggestionState ? '#1DB954' : '#535353' }}
                                    >
                                        Current Friends
                                    </button>
                                </div>
                                
                                {suggestionState && friendMatchesCopy && friendMatchesCopy.length > 0 && (
                                    <div className="mt-4 w-full space-y-2">
                                        {friendMatchesCopy.map((friend) => (
                                            <ProfileCard
                                                key={friend.user_id}
                                                pfp={friend.profile_pic}
                                                name={`${friend.first_name} ${friend.last_name}`}
                                                enterState="Request"
                                                bio={friend.bio}
                                                userID={friend.user_id}
                                                setAreYouSureText={setAreYouSureText}
                                                setAreYouSureFunc={setAreYouSureFunc}
                                            />
                                        ))}
                                    </div>
                                )}

                                {!suggestionState && (
                                    friendsCopy && friendsCopy.length > 0 ? (
                                        <div className="mt-4 w-full space-y-2">
                                            {friendsCopy.map((friend) => (
                                                <ProfileCard
                                                    key={friend.user_id}
                                                    pfp={friend.profile_pic}
                                                    name={`${friend.first_name} ${friend.last_name}`}
                                                    enterState="Friend"
                                                    bio={friend.bio}
                                                    userID={friend.user_id}
                                                    setAreYouSureText={setAreYouSureText}
                                                    setAreYouSureFunc={setAreYouSureFunc}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="mt-20 text-xl font-bold text-white">You have no friends!</p>
                                    )
                                )}
                            </div>
                        )}

                        {/* Messages Tab Content */}
                        {activeTab === 'messages' && (
                            <div className="flex flex-col items-center mt-4">
                                <div className="w-full flex">
                                    <button
                                        onClick={() => setActiveMessagesSubTab('messages')}
                                        className={`w-1/2 h-[45px] rounded-l-md flex text-xs items-center justify-center text-white font-bold`}
                                        style={{ backgroundColor: activeMessagesSubTab === 'messages' ? '#1DB954' : '#535353' }}
                                    >
                                        Messages
                                    </button>
                                    <button
                                        onClick={() => setActiveMessagesSubTab('requests')}
                                        className={`w-1/2 h-[45px] rounded-r-md flex text-xs items-center justify-center text-white font-bold`}
                                        style={{ backgroundColor: activeMessagesSubTab === 'requests' ? '#1DB954' : '#535353' }}
                                    >
                                        Requests
                                    </button>
                                </div>

                                {activeMessagesSubTab === 'messages' && (
                                    <div className="relative w-full mt-4">
                                        {/* Messages content */}
                                    </div>
                                )}

                                {activeMessagesSubTab === 'requests' && (
                                    <div className="mt-4">
                                        <p className="text-white">Requests Content</p>
                                    </div>
                                )}

                                {activeMessagesSubTab === 'messages' && (
                                    <button
                                        className="fixed bottom-24 right-4 text-white font-bold py-3 px-7 rounded z-10"
                                        style={{ background: 'linear-gradient(45deg, #0D5326, #1DB954)', borderRadius: '50px' }}
                                        onClick={handleCreateNewChat}
                                    >
                                        <img src="/create_chat_logo.svg" alt="Create Chat" />
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation Bar*/}
                <div className="w-full bg-gray-800 p-4 mt-auto">
                    <div className="flex justify-around">
                        <div className="flex flex-col items-center" onClick={() => setActiveTab('home')}>
                            <img src="/home_icon.svg" alt="Home Icon" className="w-6 h-6 sm:w-6 sm:h-6 lg:w-5 lg:h-5"
                                style={{
                                    transition: 'filter 0.3s ease',
                                    filter: activeTab === 'home' ? 'invert(35%) sepia(99%) saturate(748%) hue-rotate(86deg) brightness(92%) contrast(101%)' : 'none'
                                }}
                            />
                            <p className={`text-xs ${activeTab === 'home' ? 'text-spotify-green' : 'text-white'}`}>Home</p>
                        </div>
                        <div className="flex flex-col items-center" onClick={() => setActiveTab('events')}>
                            <img src="/event_icon.svg" alt="Event Icon" className="w-6 h-6 sm:w-6 sm:h-6 lg:w-5 lg:h-5"
                                style={{
                                    transition: 'filter 0.3s ease',
                                    filter: activeTab === 'events' ? 'invert(35%) sepia(99%) saturate(748%) hue-rotate(86deg) brightness(92%) contrast(101%)' : 'none'
                                }}
                            />
                            <p className={`text-xs ${activeTab === 'events' ? 'text-spotify-green' : 'text-white'}`}>Events</p>
                        </div>
                        <div className="flex flex-col items-center" onClick={() => setActiveTab('friends')}>
                            <img src="/heart_outline_icon.svg" alt="Heart Icon" className="w-6 h-6 sm:w-6 sm:h-6 lg:w-5 lg:h-5"
                                style={{
                                    transition: 'filter 0.3s ease',
                                    filter: activeTab === 'friends' ? 'invert(35%) sepia(99%) saturate(748%) hue-rotate(86deg) brightness(92%) contrast(101%)' : 'none'
                                }}
                            />
                            <p className={`text-xs ${activeTab === 'friends' ? 'text-spotify-green' : 'text-white'}`}>Friends</p>
                        </div>
                        <div className="flex flex-col items-center" onClick={() => setActiveTab('messages')}>
                            <img src="/message_icon.svg" alt="Message Icon" className="w-6 h-6 sm:w-6 sm:h-6 lg:w-5 lg:h-5"
                                style={{
                                    transition: 'filter 0.3s ease',
                                    filter: activeTab === 'messages' ? 'invert(35%) sepia(99%) saturate(748%) hue-rotate(86deg) brightness(92%) contrast(101%)' : 'none'
                                }}
                            />
                            <p className={`text-xs ${activeTab === 'messages' ? 'text-spotify-green' : 'text-white'}`}>Messages</p>
                        </div>
                    </div>
                </div>

                {/* Modal Components */}
                <AreYouSureCard id="unfriend_popup" text={areYouSureText} buttonName="Unfriend" buttonFunc={areYouSureFunc} />
                <AreYouSureCard id="cancel_popup" text={areYouSureText} buttonName="Okay" buttonFunc={areYouSureFunc} />
            </div>
        </div>
    );
};

export default Home;