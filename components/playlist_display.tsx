import React from 'react';
import SmallProfilePlaylist from './small_profile_images_playlist';

interface PlaylistDisplayProps {
    playlist_cover: string;
    playlist_name: string;
    profile_pic?: string;
    friend_name?: string;
}

const PlaylistDisplay: React.FC<PlaylistDisplayProps> = ({ playlist_cover, playlist_name, profile_pic, friend_name }) => {
    return (
        <div className="playlist-display w-40 md:w-48 lg:w-56"> {/* Fixed width at different breakpoints */}
            <div className="relative aspect-square w-full overflow-hidden">
                <img 
                    src={playlist_cover} 
                    alt={playlist_name} 
                    className="object-cover w-full h-full"
                />
            </div>
            <h2 className="text-left mt-2 text-lg md:text-xl font-medium truncate pl-0.5 font-poppins">
                {playlist_name}
            </h2>
            <div className="mt-1">
                <SmallProfilePlaylist
                    friendImage1={profile_pic}
                    friendName1={friend_name}
                />
            </div>
        </div>
    );
}

export default PlaylistDisplay;