import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Background from '@/components/background'
import { useState, useEffect } from 'react'

interface ProfileProps {
    id: string,
    // cause I'm lazy
    profileData: any
}

const Profile: NextPage<ProfileProps> = ( {id, profileData} ) => {
    const [activeTab, setActiveTab] = useState('profile');
    const [profilePic, setProfilePic] = useState("/default_pfp.png");
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [gender, setGender] = useState("");
    const [location, setLocation] = useState("");
    const [age, setAge] = useState("");

    // I say we use sessionStorage to store the user id for their duration on the app
    const [viewer, setViewer] = useState("Anon");

    const [isEditing, setIsEditing] = useState(false);  // Track if form in edit mode
    const [profile, setProfile] = useState({
        bio: "I love smoking",
        age: 25,
        gender: "Male",
        location: "New York"
    });

    // Toggles isEditing flag
    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    // Updates profileText that stores the value
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProfile(prevProfile => ({
            ...prevProfile,
            [name]: value
        }));
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here, e.g., send data to server
        setIsEditing(false);
    };

    useEffect(() => {
        // Anon will be default viewer
        setViewer(sessionStorage.getItem("user_id") || "Anon");
        setName(profileData.name);
        setBio(profileData.bio);
        setGender(profileData.gender);
        setLocation(profileData.location);
        setAge(profileData.age);
    })

    return (
        <div className="min-h-screen w-screen" style={{ backgroundColor: '#282828' }}>
            <Head>
                {name && (<title>{name}'s Profile</title>)}
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
                    />
                </button>
                {/* Just realized we should use vh and vw for larger elements for different mobile dimensions*/}
                <div className="w-full mt-[2vh]">
                   {viewer && name && (<p className="text-white font-bold text-2xl">{id == viewer ? "View Own Profile" : name + "'s Profile"}</p>)}
                </div>

                {/* Centred Items */}
                <div className="flex flex-col w-full items-center">
                    <div>
                        <img id="profilepic" src={profilePic} className="z-10 w-[24vw] h-[24vw] mt-[4vh]"></img>
                    </div>
                    <div className="text-center w-2/3 mt-[2vh]">
                        {name && (<p className="text-white text-2xl font-bold">{name}</p>)}
                    </div>

                    <button className="w-3/4 bg-black h-10 z-10 rounded-xl text-center z-10 mt-[5vh]">
                        <div className="flex w-full h-full z-10">
                            <div className="flex w-full items-center justify-center">
                                <img src="/spotify_logo_green.png" className="w-6 h-6 z-10 mr-2"></img>
                                <p className="text-green-500">Spotify Stats</p>
                            </div>
                        </div>
                    </button>

                    <div className="flex w-3/4 justify-between mt-[2vh]">
                        <button onClick={handleEditClick} className="w-1/2 bg-spotify-green h-10 z-10 rounded-xl text-center z-10 mr-2">
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
                    </div>
                    
                    {/* Profile, Playlist, Activity Tabs */}
                    <div className="flex space-x-4">
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
                    <div className="w-full mt-5 overflow-default">
                        {isEditing ? (
                            <form onSubmit={handleFormSubmit} className="ml-5">
                                <div className="mb-4">
                                    <label className="block text-gray-700">Bio:</label>
                                    <input
                                        type="text"
                                        name="bio"
                                        value={profile.bio}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Age:</label>
                                    <input
                                        type="number"
                                        name="age"
                                        value={profile.age}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Gender:</label>
                                    <select
                                        name="gender"
                                        value={profile.gender}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded"
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
                                        value={profile.location}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded"
                                    />
                                </div>
                                <button type="submit" className="bg-spotify-green text-white p-2 rounded">Save</button>
                            </form>
                        ) : (
                            activeTab === 'profile' && (
                                <div className="ml-5">
                                    {viewer && viewer !== id && (
                                        <div>
                                            {/* Your existing profile content here */}
                                            <p className="text-white font-bold">Bio:</p>
                                            <p className="text-white break-words">{profile.bio}</p>
                                            <p className="w-full text-white font-bold">Age:</p>
                                            <p className="text-white break-words">{profile.age}</p>
                                            <p className="text-white font-bold">Gender:</p>
                                            <p className="text-white break-words">{profile.gender}</p>
                                            <p className="text-white font-bold">Location:</p>
                                            <p className="text-white break-words">{profile.location}</p>
                                        </div>
                                    )}
                                </div>
                            )
                        )}
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
    const profileData = {name: "Top G", bio: "I love smoking", gender: "Woman", location: "Romania", age: "69"}
  
    return {
        props: {
            id,
            profileData
        },
    };
};
  

export default Profile;