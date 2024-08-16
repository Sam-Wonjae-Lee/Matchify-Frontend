import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { SlideupCard, showSlideupCard } from '@/components/slideup_card';
import { AreYouSureCard, showAreYouSureCard } from '@/components/are_you_sure_card';
import { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import axios from 'axios';

import Playlist from '@/components/playlist_card';

import TrackCard from "@/components/track_card";

interface ProfileProps {
    id: string,
    profileData: any,
    playlists: any
}

interface ProfileData {
    name: string;
    bio: string;
    age: number;
    gender: string;
    location: string;
    pfp: string;
}

const Profile: NextPage<ProfileProps> = ( {id, profileData, playlists} ) => {

    const router = useRouter();

    console.log(playlists);

    const [activeTab, setActiveTab] = useState('profile');

    // I say we use sessionStorage to store the user id for their duration on the app
    const [viewer, setViewer] = useState("Anon");
    const [friends, setFriends] = useState(false);

    const [isEditing, setIsEditing] = useState(false);  // Track if form in edit mode
    const [profile, setProfile] = useState<ProfileData>(() => profileData);

    const [editingProfile, setEditingProfile] = useState<ProfileData>(() => profileData);

    // friend request state
    const [requestClicked, setRequestClicked] = useState(false);
    const [blocked, setBlocked] = useState(false);

    const [currStatusText, setCurrStatusText] = useState("");


    interface TrackCardProps {
        index:number;
        songName: string;
        artistName: string;
        songImage: string;
        onClick: () => void;
    }
    const tracks = [
        { key: 1, songImage: "/best_girl.jpg", songName: "Top G beats", artistName: "bottom G" },
        { key: 2, songImage: "/best_girl.jpg", songName: "Top G beats", artistName: "bottom G" },
        { key: 3, songImage: "/best_girl.jpg", songName: "Top G beats", artistName: "bottom G" },
        { key: 4, songImage: "/best_girl.jpg", songName: "Top G beats", artistName: "bottom G" },
        { key: 5, songImage: "/best_girl.jpg", songName: "Top G beats", artistName: "bottom G" },
        { key: 6, songImage: "/best_girl.jpg", songName: "Top G beats", artistName: "bottom G" },
    ];

    // Updates profileText that stores the value
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditingProfile({...editingProfile, [name]: value});
    };

    const handleProfileChange = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here, e.g., send data to server
        setIsEditing(false);
        setProfile(editingProfile);
    };

    const handleBack = () => {
        router.push("/home");
    }

    const handleSpotifyStats = () => {
        router.push("/spotify_stats");
    }

    const showStatusPopup = (text: string) => {
        const sliderElement = document.getElementById("status");

        if (sliderElement) {
            sliderElement.style.display = "block";
        }
        setCurrStatusText(text);
        setTimeout(() => {
            const sliderElement = document.getElementById("status");

            if (sliderElement) {
                sliderElement.style.display = "none";
            }
        }, 1200);
    }


    const handleSendFriendRequest = () => {
        // TODO BACKEND SEND FRIEND REQUEST
        showStatusPopup("Sent Friend Request to" + profile.name + "!");
    }

    const handleUnfriend = () => {
        setRequestClicked(false);
        setFriends(false);
        showStatusPopup("Unfriended " + profile.name + "!");
    }

    const handleCancelFriendRequest = () => {
        // TODO BACKEND CANCEL FRIEND REQUEST
        setRequestClicked(false);
        showStatusPopup("Canceled Friend Request to " + profile.name);
    }

    const handleBlockUser = () => {
        // TODO BLOCK USER ON BACKEND
        setRequestClicked(false);
        setBlocked(true);
        showStatusPopup("Blocked " + profile.name);
    }

    const handleUnblockUser = () => {
        // TODO BLOCK USER ON BACKEND
        setBlocked(false);
        showStatusPopup("Unblocked " + profile.name);
    }

    useEffect(() => {
        // if user cancels edit and re-edits, we want the previous unsaved edited profile to be lost
        if (isEditing) {
            setEditingProfile(profile);
        }
    }, [isEditing])

    useEffect(() => {
        // Anon will be default viewer, if viewer is not viewing their own profile then we include the matchify stats
        setViewer(sessionStorage.getItem("userId") || "Anon");
        
        // BACKEND CALL HERE TO GET IF VIEWER IS FRIENDS WITH PROFILE
        // setFriends()
        console.log("I AM RUNNING")
        setFriends(true);
    }, [])

    return (
        <div className="min-h-screen w-screen" style={{ backgroundColor: '#282828' }}>
            <Head>
                {profile && (<title>{profile.name}'s Profile</title>)}
                <meta name="description" content="Profile Content"/>
                <link rel="icon" href="matchify_logo.svg" type="image/gif" sizes="16x16"/>
            </Head>
            <div className="h-full w-full p-8">
                {/* Back Arrow */}
                <button className="mb-4">
                    <img src="/left_arrow.svg" alt="Left Arrow" className="w-8 h-8"
                        // Hover animation
                        style={{ transition: 'filter 0.3s ease' }}
                        onMouseEnter={(e) => e.currentTarget.style.filter = 'invert(35%) sepia(99%) saturate(748%) hue-rotate(86deg) brightness(92%) contrast(101%)'}
                        onMouseLeave={(e) => e.currentTarget.style.filter = 'none'}
                        onClick={handleBack}
                    />
                </button>
                {/* Just realized we should use vh and vw for larger elements for different mobile dimensions*/}
                <div className="w-full mt-[2vh]">
                   {viewer && profile && (<p className="text-white font-bold text-2xl">{id == viewer ? "View Own Profile" : profile.name + "'s Profile"}</p>)}
                </div>

                {/* Centred Items */}
                <div className="relative flex flex-col w-full items-center">
                    <div>
                        <img id="profilepic" src={profile.pfp} className="z-10 w-[24vw] h-[24vw] mt-[4vh] rounded-full"></img>
                    </div>
                    <div className="text-center w-2/3 mt-[2vh] mb-[5vh]">
                        {profile && (<p className="text-white text-2xl font-bold">{profile.name}</p>)}
                    </div>

                    {!isEditing && (<div>
                        <button className="w-[calc(100vw-6.5rem)] bg-black h-10 z-10 rounded-xl text-center z-10">
                            <div className="flex w-full h-full z-10">
                                <div className="flex w-full items-center justify-center">
                                    {/* Spotify Stats Button */}
                                    <button
                                        className="w-[calc(100vw-6.5rem)] bg-black h-10 z-10 rounded-xl text-center z-10"
                                        onClick={handleSpotifyStats}>
                                        <div className="flex w-full h-full z-10">
                                            <div className="flex w-full items-center justify-center">
                                                <img src="/spotify_logo_green.png" className="w-6 h-6 z-10 mr-2"></img>
                                                <p className="text-green-500">Spotify Stats</p>
                                            </div>
                                        </div>
                                    </button>
                                    {/*<img src="/spotify_logo_green.png" className="w-6 h-6 z-10 mr-2"></img>*/}
                                    {/*<p className="text-green-500">Spotify Stats</p>*/}
                                </div>
                            </div>
                        </button>

                        <div className="flex w-[calc(100vw-6.5rem)] justify-between mt-[2vh]">
                            {viewer && (viewer != id) && friends && !blocked && (
                                <button className="w-1/2 bg-spotify-green h-10 z-10 rounded-xl text-center z-10 mr-2"
                                        onClick={() => {
                                            showSlideupCard("unfriend_popup");
                            }}>
                                <div className="flex w-full h-full z-10">
                                    <div className="flex w-full items-center justify-center">
                                        {/*TODO make a friends dropdown*/}
                                        <p className="text-white">Friends</p>
                                    </div>
                                </div>
                            </button>)}
                            {viewer && (viewer != id) && !friends && !blocked && !requestClicked && (<button className="w-1/2 bg-[#0094CA] h-10 z-10 rounded-xl text-center z-10 mr-2" onClick={() => {
                                showSlideupCard("slider");
                                setRequestClicked(true);
                            }}>
                                <div className="flex w-full h-full z-10">
                                    <div className="flex w-full items-center justify-center">
                                        {/*TODO make a friends dropdown*/}
                                        <p className="text-white">Request</p>
                                    </div>
                                </div>
                            </button>)}
                            {viewer && (viewer != id) && !friends && !blocked && requestClicked && (<button className="w-1/2 bg-red-600 h-10 z-10 rounded-xl text-center z-10 mr-2" onClick={() => {
                                showAreYouSureCard("cancel_popup");
                            }}>
                                <div className="flex w-full h-full z-10">
                                    <div className="flex w-full items-center justify-center">
                                        {/*TODO make a friends dropdown*/}
                                        <p className="text-white">Cancel</p>
                                    </div>
                                </div>
                            </button>)}
                            {viewer && (viewer != id) && blocked && (<button className="w-1/2 bg-red-800 h-10 z-10 rounded-xl text-center z-10 mr-2" onClick={() => {
                                showAreYouSureCard("unblock_popup");
                            }}>
                                <div className="flex w-full h-full z-10">
                                    <div className="flex w-full items-center justify-center">
                                        {/*TODO make a friends dropdown*/}
                                        <p className="text-white">Blocked</p>
                                    </div>
                                </div>
                            </button>)}
                            {viewer && (viewer != id) && <button className="w-1/2 bg-white h-10 z-10 rounded-xl text-center z-10 ml-2">
                                <div className="flex w-full h-full z-10">
                                    <div className="flex w-full items-center justify-center">
                                        {/*TODO link to message*/}
                                        <p className="text-spotify-green">Message</p>
                                    </div>
                                </div>
                            </button>}
                            {viewer && (viewer == id) && (<button className="w-1/2 bg-spotify-green h-10 z-10 rounded-xl text-center z-10 mr-2" onClick={() => {setIsEditing((prev) => {return !prev})}}>
                                <div className="flex w-full h-full z-10">
                                    <div className="flex w-full items-center justify-center">
                                        <p className="text-white">Edit Profile</p>
                                    </div>
                                </div>
                            </button>)}
                            {viewer && (viewer == id) && (<button className="w-1/2 bg-white h-10 z-10 rounded-xl text-center z-10 ml-2">
                                <div className="flex w-full h-full z-10">
                                    <div className="flex w-full items-center justify-center">
                                        <p className="text-spotify-green">Settings</p>
                                    </div>
                                </div>
                            </button>)}
                        </div>


                    </div>)}
                    {/* Profile, Playlist, Activity Tabs */}
                    <div className="flex w-full justify-around mt-[2vh]">
                        <button
                            className={`text-xl font-bold underline ${activeTab === 'profile' ? 'text-white' : 'text-gray-500'}`}
                            onClick={() => setActiveTab('profile')}
                        >
                            Profile
                        </button>
                        <button
                            className={`text-xl font-bold underline ${activeTab === 'playlist' ? 'text-white' : 'text-gray-500'}`}
                            onClick={() => setActiveTab('playlist')}
                        >
                            Playlist
                        </button>
                        <button
                            className={`text-xl font-bold underline ${activeTab === 'activity' ? 'text-white' : 'text-gray-500'}`}
                            onClick={() => setActiveTab('activity')}
                        >
                            Activity
                        </button>
                    </div>
                    {/* Tab Content */}
                    <div className="w-full mt-[2vh] overflow-default">
                        {activeTab === 'profile' && (!isEditing ? (
                            <div className="ml-5 ml-5">
                                {viewer && (viewer != id) && (<div className="text-white">
                                    <p className="font-bold text-spotify-green">Matchify:</p>
                                    <ul className="list-disc">
                                        <li className="text-sm ml-5 mt-[1vh]">You're both racist</li>
                                        <li className="text-sm ml-5">You both are misogynists</li>
                                        <li className="text-sm ml-5">You don't have a bugatti</li>
                                    </ul>
                                </div>)}
                                
                                <p className="text-white font-bold mt-[2vh]">Bio:</p>
                                {profile && (<p className="text-sm text-white break-words">{profile.bio}</p>)}

                                <p className="w-full text-white font-bold mt-[2vh]">Age:</p>
                                {profile && (<p className="text-sm text-white break-words">{profile.age}</p>)}

                                <p className="text-white font-bold mt-[2vh]">Gender:</p>
                                {profile && (<p className="text-sm text-white break-words">{profile.gender}</p>)}

                                <p className="text-white font-bold mt-[2vh]">Location:</p>
                                {profile && (<p className="text-sm text-white break-words">{profile.location}</p>)}
                            </div>
                        ) : 
                        (<form onSubmit={handleProfileChange} className="ml-5 mr-5">
                            <div className="mb-4">
                                <label className="block text-gray-700">Bio:</label>
                                <input
                                    type="text"
                                    name="bio"
                                    value={editingProfile.bio}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded text-black"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Age:</label>
                                <input
                                    type="number"
                                    name="age"
                                    value={editingProfile.age}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded text-black"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Gender:</label>
                                <select
                                    name="gender"
                                    value={editingProfile.gender}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded text-black"
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Location:</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={editingProfile.location}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded text-black"
                                />
                            </div>
                            <button type="submit" className="w-full bg-spotify-green text-white p-2 rounded mt-[2vh] h-[6vh]">Apply Changes</button>
                            <button className="w-full bg-white text-red-500 p-2 rounded mt-[2vh] h-[6vh]" onClick={() => setIsEditing(false)}>Cancel</button>
                        </form>))}
                        {activeTab === 'playlist' && (
                            <div className="mt-4 w-full h-full">
                                <Playlist playlists={playlists} username={profile.name} fav={profileData.fav_playlist}/>
                                {/* <div className="mt-4 w-full px-4">
                                    <ul className="space-y-4">
                                        {tracks.map((track, index) => (
                                            <div key={index} className="flex-shrink-0">
                                                <TrackCard
                                                    songImage={track.songImage}
                                                    songName={track.songName}
                                                    artistName={track.artistName}
                                                    trackKey={track.key}
                                                    onClick={() => console.log('Friend clicked')}
                                                />
                                            </div>
                                        ))}
                                    </ul>
                                </div> */}
                            </div>
                        )}
                        {activeTab === 'activity' && (
                            <div>
                                <p className="text-white">Activity Content Here</p>
                            </div>
                        )}
                    </div>
                    <div id="status" className="hidden fixed z-100 bottom-0 h-8 text-lg rounded-lg shadow-md w-[calc(100vw-4rem)] text-center bg-spotify-green mb-8">
                        {currStatusText}
                    </div>
                    <AreYouSureCard id="unfriend_popup" text={"Are you sure you want to unfriend " + profile.name + "? You will no longer see their updates or be able to interact with them as friends. This action cannot be undone."} buttonName="Unfriend" buttonFunc={handleUnfriend}></AreYouSureCard>
                    <AreYouSureCard id="cancel_popup" text={"Are you sure you want to cancel your friend request to " + profile.name + "?."} buttonName="Okay" buttonFunc={handleCancelFriendRequest}></AreYouSureCard>
                    <AreYouSureCard id="unblock_popup" text={"Are you sure you want to unblock " + profile.name + "? He has a bugatti though?" }buttonName="Unblock" buttonFunc={handleUnblockUser}></AreYouSureCard>
                    <SlideupCard id="slider" first={profile.name} second={"Send Friend Request"} third={"Block User"} firstFunc={() => {setRequestClicked(false)}} secondFunc={handleSendFriendRequest} thirdFunc={handleBlockUser}></SlideupCard>
                </div>

            </div>

        </div>
    );
};

// so this function runs on server before page gets sent to client. It's built into nextjs. You have to refresh page if you want
// to see changes 
export const getServerSideProps: GetServerSideProps = async (context) => {
    
    // typescript keeps yelling about types
    const { id } = context.params as {id: string};

    // TODO FETCH BACKEND INFO ON PERSON
    console.log("THE ID IS: " + id);
    const playlists = await axios.get(`http://localhost:8888/spotify/user/${id}/playlists`);
    const profile = await axios.get(`http://localhost:8888/user/get/${id}`);

    const profileData = {name: profile.data.username, bio: profile.data.bio, gender: profile.data.gender, location: profile.data.location, age: "Doing this later", pfp: profile.data.profile_pic, fav_playlist: profile.data.favourite_playlist}
  
    return {
        props: {
            id,
            profileData,
            playlists: playlists.data
        },
    };
};
  

export default Profile;