import React from 'react';

interface UserCardProps {
    profilePicture: string;
    username: string;
    songName: string;
}

const UserCard: React.FC<UserCardProps> = ({ profilePicture, username, songName }) => {
    return (
        <div className="flex flex-col items-center p-4 rounded-lg shadow-md mb-4" style={{ backgroundColor: '#535353' }}>
            <img src={profilePicture} alt={`${username}'s profile`} className="w-10 h-10 rounded-full mb-2" />
            <h2 className="text-base font-bold text-white mb-1">{username}</h2>
            <p className="text-white text-xs">Listening to: {songName}</p>
        </div>
    );
};

export default UserCard;