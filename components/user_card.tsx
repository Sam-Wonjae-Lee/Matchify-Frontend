import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

interface UserCardProps {
    profilePicture: string;
    username: string;
    userId: string
}

const UserCard: React.FC<UserCardProps> = ({ profilePicture, username, userId}) => {

    const [songName, setSongName] = useState("");

    useEffect(() => {

        const fetchPlaybackState = async () => {
            const response = await axios.get(`http://localhost:8888/spotify/user/${userId}/playback`);
            console.log("THE RESPONSE IS: " + response.data);
            setSongName(response.data);
        }

        fetchPlaybackState();
    }, [])

    return (
        <div className="flex flex-col items-center p-2 w-[45vw] h-[14vh] sm:w-[45vw] sm:h-[14vh] lg:w-[10vw] lg:h-[18vh] rounded-lg shadow-md mb-4 bg-[#535353]">
            <img src={profilePicture} alt={`${username}'s profile`} className="w-10 h-10 sm:w-10 sm:h-10 lg:w-8 lg:h-8 mb-2 rounded-full border-2 border-spotify-green object-cover" />
            <h2 className="text-sm sm:text-sm lg:text-xs font-bold text-white mb-1">{username}</h2>
            <p className="text-white text-xs sm:text-xs lg:text-[8px] overflow-hidden">
                {songName && songName.length > 0 ? "Listening to: " + songName : "Not Listening at the Moment"}
            </p>
        </div>
    );
};

export default UserCard;