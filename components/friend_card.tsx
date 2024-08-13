import React from 'react';

interface FriendCardProps {
    key:number;
    suggested: boolean;
    bio: string;
    friendName: string;
    friendImage: string;
    onClick: () => void;
}


const FriendCard: React.FC<FriendCardProps> = ({key, suggested, bio, friendName, friendImage, onClick}) => {
    return (
        <div className="flex flex-col items-center p-4 rounded-lg shadow-md mb-4" style={{ backgroundColor: '#535353' }}>
            <img src={friendImage} alt={`${friendName}'s profile`} className="w-10 h-10 rounded-full mb-2" />
            <h2 className="text-base font-bold text-white mb-1">{friendName}</h2>
            <p className="text-white text-xs">{bio}</p>
            <p className="text-white text-xs">{suggested}</p>
        </div>
    );
};

export default FriendCard;