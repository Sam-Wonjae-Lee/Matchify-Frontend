import React from 'react';
import SmallProfileImages from './small_profile_images';


interface FriendsActivitiesProps {
    friendName: string;
    friendImage: string;
    friendActivity: string;
    friendActivityImage: string;
    friendActivityTime: string;
}



const FriendsActivities: React.FC<FriendsActivitiesProps> = ({friendName, friendImage, friendActivity, friendActivityImage, friendActivityTime}) => {
    return (
        <div className="flex items-center p-4 mb-4 bg-gray-800 bg-opacity-60 rounded-lg">
            <img src="https://via.placeholder.com/50" alt="Mei Wang" className="rounded-full w-12 h-12" />
            <div className="flex-1 ml-4">
                <h4 className="text-white font-bold">Mei Wang</h4>
                <p className="text-white text-xs">Shared interest in EDM with favorite tracks by top DJs</p>
            </div>
                <div className="text-green-500 text-xs py-1 px-3 bg-gray-700 bg-opacity-60 rounded-full">Friends</div>
                </div>
    );
};