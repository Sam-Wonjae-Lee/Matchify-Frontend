import React from "react";

interface FriendsPlaylistProp {
    playlistImage: string;
    playlistName: string;
    userImage: string;
    userName: string;
}

const FriendsPlaylistCard: React.FC<FriendsPlaylistProp> = ({ playlistImage, playlistName, userImage, userName }) => {
    return (
        <div className="flex items-center justify-start" style={{ backgroundColor: '#535353' }}>
            {/* Playlist Image */}
            <div className="flex flex-col items-center mr-4">
                <img src={playlistImage} alt={`${playlistName} cover`} className="w-16 h-16 rounded-md mb-2" />
            </div>

            {/* User Image and Details */}
            <div className="flex flex-col justify-end">
                <div className="flex items-center mb-2">
                    <img src={userImage} alt={`${userName}'s avatar`} className="w-10 h-10 rounded-full mr-2" />
                    <span className="text-sm text-gray-300">{userName}</span>
                </div>
                <div className="text-white text-lg font-semibold">{playlistName}</div>
            </div>
        </div>
    );
};
export default FriendsPlaylistCard;