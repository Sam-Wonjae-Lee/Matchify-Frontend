import type { NextPage } from "next"
import Head from "next/head"
import Background from "@/components/background"
import { useState } from "react";

const Settings = () => {
    // Track if any buttons have been selected
    const [isChanged, setIsChanged] = useState(false);
    // Track if Apply Changes button has been pressed
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleCheckboxChange = () => {
        setIsChanged(true);
    };

    const handleApplyChanges = () => {
        // Handle apply changes logic here
        setIsChanged(false);
        setIsModalVisible(true);
        setTimeout(() => setIsModalVisible(false), 3000); // Hide popup after 3 seconds
    };

    return (
        <div className="h-screen w-screen" style={{ backgroundColor: '#282828' }}>
            <Head>
                <title>Settings</title>
                <meta name="description" content="Settings"/>
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
                <div className="mb-4">
                    <p className="text-white font-bold text-2xl">Settings</p>
                </div>

                <div className="mt-8 space-y-2">
                    <p className="text-white font-bold">Appearance</p>
                    <div className="flex flex-col space-y-2">
                        <div className="flex items-center">
                            <p className="text-white">Dark Mode</p>
                            <label className="switch ml-auto">
                                <input type="checkbox" onChange={handleCheckboxChange} />
                                <span className="slider round"></span>
                            </label>
                        </div>
                    </div>

                    <p className="text-white font-bold">Privacy</p>
                    <div className="flex flex-col space-y-2">
                        <div className="flex items-center">
                            <p className="text-white">Allow only friends to message you</p>
                            <label className="switch ml-auto">
                                <input type="checkbox" onChange={handleCheckboxChange} />
                                <span className="slider round"></span>
                            </label>
                        </div>
                        <div className="flex items-center">
                            <p className="text-white">Profile visible to friends only</p>
                            <label className="switch ml-auto">
                                <input type="checkbox" onChange={handleCheckboxChange} />
                                <span className="slider round"></span>
                            </label>
                        </div>
                    </div>

                    <p className="text-white font-bold">Notifications</p>
                    <div className="flex flex-col space-y-2">
                        <div className="flex items-center">
                            <p className="text-white">Friend Requests</p>
                            <label className="switch ml-auto">
                                <input type="checkbox" onChange={handleCheckboxChange} />
                                <span className="slider round"></span>
                            </label>
                        </div>
                        <div className="flex items-center">
                            <p className="text-white">Playlist Updates</p>
                            <label className="switch ml-auto">
                                <input type="checkbox" onChange={handleCheckboxChange} />
                                <span className="slider round"></span>
                            </label>
                        </div>
                        <div className="flex items-center">
                            <p className="text-white">New Events</p>
                            <label className="switch ml-auto">
                                <input type="checkbox" onChange={handleCheckboxChange} />
                                <span className="slider round"></span>
                            </label>
                        </div>
                        <div className="flex items-center">
                            <p className="text-white">Event Reminders</p>
                            <label className="switch ml-auto">
                                <input type="checkbox" onChange={handleCheckboxChange} />
                                <span className="slider round"></span>
                            </label>
                        </div>
                    </div>

                    <p className="text-white font-bold">Account</p>
                    <div className="flex flex-col space-y-2">
                        <div className="flex items-center">
                            <p className="text-white">Logout</p>
                            <button className="ml-auto mb-4">
                                <img src="/right_arrow.svg" alt="Left Arrow" className="w-8 h-8"
                                    // Hover animation
                                    style={{ transition: 'filter 0.3s ease' }}
                                    onMouseEnter={(e) => e.currentTarget.style.filter = 'invert(35%) sepia(99%) saturate(748%) hue-rotate(86deg) brightness(92%) contrast(101%)'}
                                    onMouseLeave={(e) => e.currentTarget.style.filter = 'none'}
                                />
                            </button>
                        </div>
                        <div className="flex items-center">
                            <p className="text-red-500">Delete Account</p>
                            <button className="ml-auto mb-4">
                                <img src="/right_arrow_red.svg" alt="Left Arrow" className="w-8 h-8"
                                    // Hover animation
                                    style={{ transition: 'filter 0.3s ease' }}
                                    onMouseEnter={(e) => e.currentTarget.style.filter = 'invert(35%) sepia(99%) saturate(748%) hue-rotate(86deg) brightness(92%) contrast(101%)'}
                                    onMouseLeave={(e) => e.currentTarget.style.filter = 'none'}
                                />
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center mt-4">
                    {isChanged && !isModalVisible && (
                        <button
                            className="font-bold bg-green-500 text-white py-4 px-6 rounded-lg shadow-md flex items-center justify-center w-full"
                            onClick={handleApplyChanges}
                        >
                            Apply Changes
                        </button>
                    )}

                    {isModalVisible && (
                        <div className="font-bold bg-spotify-green text-white py-4 px-6 rounded-lg shadow-md flex items-center justify-center w-full">
                            <span>Changes Made!</span>
                            <img src="/white_checkmark.svg" alt="Changes Made" className="h-6 w-6 ml-2" />
                        </div>
                    )}
                </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;