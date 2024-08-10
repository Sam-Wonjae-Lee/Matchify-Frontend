import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Background from '@/components/background'
import { useState, useEffect } from 'react'
import { useRouter } from "next/router";

interface ProfileProps {
    id: string,
    profileData: any
}

interface ProfileData {
    name: string;
    bio: string;
    age: number;
    gender: string;
    location: string;
    pfp: string;
}

const Profile: NextPage<ProfileProps> = ( {id, profileData} ) => {

    const router = useRouter();

    const [activeTab, setActiveTab] = useState('profile');

    // I say we use sessionStorage to store the user id for their duration on the app
    const [viewer, setViewer] = useState("Anon");
    const [friends, setFriends] = useState(false);

    const [isEditing, setIsEditing] = useState(false);  // Track if form in edit mode
    const [profile, setProfile] = useState<ProfileData>(() => profileData);

    const [editingProfile, setEditingProfile] = useState<ProfileData>(() => profileData);

    const [requestClicked, setRequestClicked] = useState(false);

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
        router.back();
    }

    const handleRequestClick = () => {
        const sliderElement = document.getElementById("slider");

        if (sliderElement) {
            sliderElement.style.display = "block";
            sliderElement.classList.remove("animate-slideDown");
            sliderElement.classList.add("animate-slideUp");
            console.log("Slider wdwdd");
        } else {
            console.log("Slider element not found");
        }
        setRequestClicked(true);
    }

    const removeSlider = () => {
        const sliderElement = document.getElementById("slider");

        if (sliderElement) {
            //setTimeout(() => {sliderElement.style.display = "hidden"}, 1000)
            sliderElement.classList.remove("animate-slideUp");
            sliderElement.classList.add("animate-slideDown");
        } else {
            console.log("Slider element not found");
        }
        setRequestClicked(false);
    }

    const pressDownHighlight = (id: string) => {
        const sliderPart = document.getElementById(id);

        if(sliderPart) {
            sliderPart.style.backgroundColor = "rgb(75, 85, 99)";
        }
    }

    const pressUpHighlight = (id: string) => {
        const sliderPart = document.getElementById(id);

        if(sliderPart) {
            sliderPart.style.backgroundColor = "rgb(107, 114, 128)";
        }
    }

    useEffect(() => {
        // if user cancels edit and re-edits, we want the previous unsaved edited profile to be lost
        if (isEditing) {
            setEditingProfile(profile);
        }
    }, [isEditing])

    useEffect(() => {
        // Anon will be default viewer, if viewer is not viewing their own profile then we include the matchify stats
        setViewer(sessionStorage.getItem("user_id") || "Anon");
        // BACKEND CALL HERE TO GET IF VIEWER IS FRIENDS WITH PROFILE
        // setFriends()
        setFriends(false);
    })

    return (
        <div className="min-h-screen w-screen" style={{ backgroundColor: '#282828' }}>
            <Head>
                {profile && (<title>{profile.name}'s Profile</title>)}
                <meta name="description" content="Profile Content"/>
                <link rel="icon" href="matchify_logo.svg" type="image/gif" sizes="16x16"></link>
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
                        <img id="profilepic" src={profile.pfp} className="z-10 w-[24vw] h-[24vw] mt-[4vh]"></img>
                    </div>
                    <div className="text-center w-2/3 mt-[2vh] mb-[5vh]">
                        {profile && (<p className="text-white text-2xl font-bold">{profile.name}</p>)}
                    </div>

                    {!isEditing && (<div>
                        <button className="w-[calc(100vw-6.5rem)] bg-black h-10 z-10 rounded-xl text-center z-10">
                            <div className="flex w-full h-full z-10">
                                <div className="flex w-full items-center justify-center">
                                    <img src="/spotify_logo_green.png" className="w-6 h-6 z-10 mr-2"></img>
                                    <p className="text-green-500">Spotify Stats</p>
                                </div>
                            </div>
                        </button>

                        {viewer && (viewer == id) && <div className="flex w-[calc(100vw-6.5rem)] justify-between mt-[2vh]">
                            <button className="w-1/2 bg-spotify-green h-10 z-10 rounded-xl text-center z-10 mr-2" onClick={() => {setIsEditing((prev) => {return !prev})}}>
                                <div className="flex w-full h-full z-10">
                                    <div className="flex w-full items-center justify-center">
                                        <p className="text-white">Edit Profile</p>
                                    </div>
                                </div>
                            </button>
                            <button className="w-1/2 bg-white h-10 z-10 rounded-xl text-center z-10 ml-2">
                                <div className="flex w-full h-full z-10">
                                    <div className="flex w-full items-center justify-center">
                                        <p className="text-spotify-green">Settings</p>
                                    </div>
                                </div>
                            </button>
                        </div>}

                        {viewer && (viewer != id) && friends && <div className="flex w-[calc(100vw-6.5rem)] justify-between mt-[2vh]">
                            <button className="w-1/2 bg-spotify-green h-10 z-10 rounded-xl text-center z-10 mr-2">
                                <div className="flex w-full h-full z-10">
                                    <div className="flex w-full items-center justify-center">
                                        {/*TODO make a friends dropdown*/}
                                        <p className="text-white">Friends</p>
                                    </div>
                                </div>
                            </button>
                            <button className="w-1/2 bg-white h-10 z-10 rounded-xl text-center z-10 ml-2">
                                <div className="flex w-full h-full z-10">
                                    <div className="flex w-full items-center justify-center">
                                        {/*TODO link to message*/}
                                        <p className="text-spotify-green">Message</p>
                                    </div>
                                </div>
                            </button>
                        </div>}

                        {viewer && (viewer != id) && !friends && <div className="flex w-[calc(100vw-6.5rem)] justify-between mt-[2vh]">
                            {!requestClicked && <button className="w-1/2 bg-[#0094CA] h-10 z-10 rounded-xl text-center z-10 mr-2" onClick={handleRequestClick}>
                                <div className="flex w-full h-full z-10">
                                    <div className="flex w-full items-center justify-center">
                                        {/*TODO make a friends dropdown*/}
                                        <p className="text-white">Request</p>
                                    </div>
                                </div>
                            </button>}
                            {requestClicked && <button className="w-1/2 bg-red-600 h-10 z-10 rounded-xl text-center z-10 mr-2">
                                <div className="flex w-full h-full z-10">
                                    <div className="flex w-full items-center justify-center">
                                        {/*TODO make a friends dropdown*/}
                                        <p className="text-white">Cancel</p>
                                    </div>
                                </div>
                            </button>}
                            <button className="w-1/2 bg-white h-10 z-10 rounded-xl text-center z-10 ml-2">
                                <div className="flex w-full h-full z-10">
                                    <div className="flex w-full items-center justify-center">
                                        {/*TODO link to message*/}
                                        <p className="text-spotify-green">Message</p>
                                    </div>
                                </div>
                            </button>
                        </div>}
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
                            <div>
                                <p className="text-white">Playlist Content Here</p>
                            </div>
                        )}
                        {activeTab === 'activity' && (
                            <div>
                                <p className="text-white">Activity Content Here</p>
                            </div>
                        )}
                    </div>
                    <div id="slider" className="hidden rounded-lg fixed w-full h-1/4 bg-gray-500 bottom-0">
                        <button id="slider1" className="flex flex-col items-center w-full h-[30%]" onClick={removeSlider}
                        onTouchStart={() => pressDownHighlight("slider1")} onTouchEnd={() => pressUpHighlight("slider1")}>
                            <div className="w-1/4 h-4 bg-gray-100 rounded-lg mt-4">
                            </div>
                            <div className="mt-2">
                                {profile.name}
                            </div>
                        </button >
                        <button id="slider2" className="w-full h-[30%]" onTouchStart={() => pressDownHighlight("slider2")} onTouchEnd={() => pressUpHighlight("slider2")}>
                            Unfriend
                        </button>
                        <button id="slider3" className="w-full h-[40%] text-center text-red-500" onTouchStart={() => pressDownHighlight("slider3")} onTouchEnd={() => pressUpHighlight("slider3")}>
                            Block User
                        </button>
                    </div>
                    
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
    console.log(id);
    const profileData = {name: "Top G", bio: "I love smoking", gender: "Woman", location: "Romania", age: "69", pfp: "/default_pfp.png"}
  
    return {
        props: {
            id,
            profileData
        },
    };
};
  

export default Profile;