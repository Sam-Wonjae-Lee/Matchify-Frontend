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
        const response = await axios.post("http://localhost:8888/match/get_matches", {user_id: sessionStorage.getItem("userId")});
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
    const handleEventClick = (eventID: string) => { 
        console.log('Event ID:', eventID);
    }

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
        
        <div className="bg-gray-900 flex flex-col min-h-screen w-screen overflow-y-auto" style={{ backgroundColor: '#282828', marginBottom: '4.5rem' }}>
            <Head>
                <title>{getTabTitle()}</title>
                <meta name="description" content="Home Screen"/>
                <link rel="icon" href="matchify_logo.svg" type="image/gif" sizes="16x16"></link>
            </Head>
            <div className="h-full w-full p-8">
                <div className="mb-4 flex justify-between items-center">
                    <p className="text-spotify-green font-bold text-2xl">{getTabTitle()}</p>
                    <div className="flex space-x-4">

                        {/* Friend Requests Button */}
                        <img src="/heart_icon.svg" alt="Heart Icon" className="w-6 h-6"
                            style={{ transition: 'filter 0.3s ease' }}
                            onMouseEnter={(e) => e.currentTarget.style.filter = 'invert(35%) sepia(99%) saturate(748%) hue-rotate(86deg) brightness(92%) contrast(101%)'}
                            onMouseLeave={(e) => e.currentTarget.style.filter = 'none'}
                            onClick={handleFriendRequestsRedirect}
                        />

                        {/* Notifications Button */}
                        <img src="/bell_icon.svg" alt="Bell Icon" className="w-6 h-6"
                            style={{ transition: 'filter 0.3s ease' }}
                            onMouseEnter={(e) => e.currentTarget.style.filter = 'invert(35%) sepia(99%) saturate(748%) hue-rotate(86deg) brightness(92%) contrast(101%)'}
                            onMouseLeave={(e) => e.currentTarget.style.filter = 'none'}
                            onClick={handleNotificationsRedirect}
                        />

                        {/* Profile Button */}
                        <img src={profilePicture ?? ''} alt="Profile Icon" className="z-10 w-[7vw] h-[7vw] rounded-full border-2 border-spotify-green object-cover" onClick={handleProfileRedirect}/>
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
                <div>
                    {/* Conditionally render the search bar */}
                    {activeTab === 'events' && (
                        <SearchBar
                            placeholder="Search"
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleEventSearch();
                                }
                            }}
                        />
                    )}
                </div>
                
                {/* Events Page */}
                {activeTab === 'events' && 
                <div className="flex flex-col items-center mt-4 space-y-4 w-full max-w-screen-lg mx-auto">

    {/* filter tabs */}
    <div className="flex overflow-x-auto no-scrollbar space-x-2 w-full">
        {/* location */}
        <FilterEventsTabs name="Location" onClick={handleLocationTab} />

        {/* date */}
        <FilterEventsTabs name="Date" onClick={handleDateTab} />

        {/* artist */}
        <FilterEventsTabs name="Artist" onClick={handleArtistTab} />

        {/* genre */}
        <FilterEventsTabs name="Genre" onClick={handleGenreTab} />
        
        {/* friend_attending */}
        <FilterEventsTabs name="Friends Attending" onClick={handleFriendsAttendingTab} />

        {/* attending */}
        <FilterEventsTabs name="Attending" onClick={handleAttendingTab} />
        </div>
        

        {/* for events, their event id is unique and is used to identify them in the database */}
        <div className="flex flex-col items-start w-full h-screen ">
            <h1 className="text-2xl font-bold text-white">{headerText}</h1>
            {/* Your events content goes here */}

            

            <div className="flex flex-wrap justify-center mt-4 space-y-4">
                {/* Map over concertRecommendations to render EventCard for each concert */}

                    {recommendations.length > 0 ? (
                        console.log(recommendations),
                                recommendations.map((event: any) => (
                                    console.log(event),
                                    <div className="flex-shrink-0" >
                                        <EventCard
                                            key={event.concert_id}
                                            eventName={event.concert_name}
                                            eventDate={event.concert_date}
                                            eventLocation={event.concert_location}
                                            eventImage={event.concert_image}
                                            friendImage1={event.friendImage1}
                                            friendImage2={event.friendImage2}
                                            friendName1={event.friendName1}
                                            friendName2={event.friendName2}
                                            additionalCount={event.additionalCount}
                                            onClick={() => handleEventClick(event.id)}
                                        />
                                    </div>
                                ))
                            ) : (
                                <p className="text-white">No events found</p>
                            )}
                    {/* <div className="flex-shrink-0">
                        <EventCard
                            key={1}
                            eventName="Kanye West"
                            eventDate="June 24, 2022"
                            eventLocation="New York City"
                            eventImage="/kanye.jpeg"
                            friendImage1="/default_pfp.png"
                            friendImage2="/default_pfp.png"
                            friendName1="John Doe"
                            friendName2="Jane Doe"
                            additionalCount={999}
                            onClick={() => handleEventClick(1)}
                        />
                    </div>

                    <div className="flex-shrink-0">
                        <EventCard
                            key={2}
                            eventName="UFC 214"
                            eventDate="June 26, 2022"
                            eventLocation="Las Vegas"
                            eventImage="/UFC214.jpg"
                            friendImage1="/default_pfp.png"
                            // friendImage2="/default_pfp.png"
                            friendName1="John Doe"
                            // friendName2="Jane Doe"
                            additionalCount={999}
                            onClick={() => handleEventClick(2)}
                        />
                    </div>

                    <div className="flex-shrink-0">
                        <EventCard
                            key={3}
                            eventName="Olypic Basketball Finals"
                            eventDate="August 10, 2024"
                            eventLocation="Paris"
                            eventImage="/olympic_basketball_final.jpg"
                            friendImage1="/default_pfp.png"
                            // friendImage2="/default_pfp.png"
                            friendName1="John Doe"
                            // friendName2="Jane Doe"
                            additionalCount={999}
                            onClick={() => handleEventClick(3)}
                        />
                    </div> */}
            </div>
        </div>
        </div>}
            {/* Friends Search Bar */}
            {activeTab === 'friends' && (
                <SearchBar
                    placeholder="Search"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleFriendSearch();
                        }
                    }}
                />
            )}
            {activeTab === 'friends' && 
                <div className="flex flex-col items-center mt-4">
                    <div className="w-full flex">
                        <button
                            onClick={() => setSuggestionState(true)}
                            className={`w-1/2 mt-4 rounded-l-md flex text-xs items-center justify-center text-white font-bold`}
                            style={{ height: '45px', backgroundColor: suggestionState === true ? '#1DB954' : '#535353'}}
                        >
                            Matchify Suggestions
                        </button>
                        <button
                            onClick={() => setSuggestionState(false)}
                            className={`w-1/2 mt-4 rounded-r-md flex text-xs items-center justify-center text-white font-bold`}
                            style={{ height: '45px', backgroundColor: suggestionState === false ? '#1DB954' : '#535353'}}
                        >
                            Current Friends
                        </button>
                    </div>
                    {suggestionState && friendMatchesCopy && friendMatchesCopy.length > 0 && (<div className="mt-8 w-full">
                        {friendMatchesCopy.map((friend) => (
                            <div className="">
                                <ProfileCard
                                    pfp={friend.profile_pic}
                                    name={friend.first_name + " " + friend.last_name}
                                    enterState={"Request"}
                                    bio={friend.bio}
                                    userID={friend.user_id}
                                    setAreYouSureText={setAreYouSureText}
                                    setAreYouSureFunc={setAreYouSureFunc}
                                />
                            </div>
                        ))}
                    </div>)}

                    {!suggestionState && friendsCopy && friendsCopy.length > 0 && (<div className="mt-8 w-full">
                        {friendsCopy.map((friend) => (
                            <div className="">
                                <ProfileCard
                                    pfp={friend.profile_pic}
                                    name={friend.first_name + " " + friend.last_name}
                                    enterState={"Friend"}
                                    bio={friend.bio}
                                    userID={friend.user_id}
                                    setAreYouSureText={setAreYouSureText}
                                    setAreYouSureFunc={setAreYouSureFunc}
                                />
                            </div>
                        ))}
                    </div>)}
                    {!suggestionState && friends && friends.length == 0 && (<p className="mt-20 text-xl font-bold text-white">You have no friends!</p>)}

                    <AreYouSureCard id="unfriend_popup" text={areYouSureText} buttonName="Unfriend" buttonFunc={areYouSureFunc}>
                    </AreYouSureCard>
                    <AreYouSureCard id="cancel_popup" text={areYouSureText} buttonName="Okay" buttonFunc={areYouSureFunc}>
                    </AreYouSureCard>
                </div>
            }

            {/* Conditionally render the search bar */}
            {activeTab === 'messages' && (
                <SearchBar
                    placeholder="Search"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleMessagesSearch();
                        }
                    }}
                />
            )}
            {activeTab === 'messages' && (
                <div className="flex flex-col items-center mt-4 min-h-screen">
                    {/* Messages Sub-Tab Navigation */}
                    <div className="w-full flex">
                        <button
                            onClick={() => setActiveMessagesSubTab('messages')}
                            className={`w-1/2 mt-4 rounded-l-md flex text-xs items-center justify-center text-white font-bold`}
                            style={{ height: '45px', backgroundColor: activeMessagesSubTab === 'messages' ? '#1DB954' : '#535353'}}
                        >
                            Messages
                        </button>
                        <button
                            onClick={() => setActiveMessagesSubTab('requests')}
                            className={`w-1/2 mt-4 rounded-r-md flex text-xs items-center justify-center text-white font-bold`}
                            style={{ height: '45px', backgroundColor: activeMessagesSubTab === 'requests' ? '#1DB954' : '#535353'}}
                        >
                            Requests
                        </button>
                    </div>

                    {/* Messages Sub-Tab Content */}
                    {activeMessagesSubTab === 'messages' && (
                        <div className="relative w-full">
                            <button
                                className="fixed bottom-24 right-4 text-white font-bold py-3 px-7 rounded z-10"
                                style={{ background: 'linear-gradient(45deg, #0D5326, #1DB954)', borderRadius: '50px' }}
                                onClick={handleCreateNewChat}
                            >
                                <img src="/create_chat_logo.svg" alt="Create Chat"/>
                            </button>
                        </div>
                    )}
                    {/* Requests Content */}
                    {activeMessagesSubTab === 'requests' && (
                        <div>
                            <p>Requests Content</p>
                        </div>
                    )}
                </div>
                )}
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