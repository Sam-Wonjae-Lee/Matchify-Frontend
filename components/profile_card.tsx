import React from 'react';
import { useRouter } from "next/router";

interface FriendCardProps {
    key: number;
    bio: string;
    name: string;
    pfp: string;
    userID: string;
    enterState: string;
}


const ProfileCard: React.FC<FriendCardProps> = ({key, bio, name, pfp, userID, enterState = 'Friends'}) => {

    const router = useRouter();

    const handleProfileRedirect = () => {
        router.push("/profile/" + userID);
    }

    return (
        <div className="flex items-center p-4 mb-4 bg-[#535353] bg-opacity-60 rounded-lg" onClick={handleProfileRedirect}>
            <img src={pfp} alt={name} className="rounded-full w-12 h-12" />
                <div className="flex-1 ml-4">
                    <h4 className="text-white font-bold">{name}</h4>

                    {/* Bio for now unless we want to use matching statistics here later on */}
                    <p className="text-white text-xs">{bio}</p>
                </div>
            <div className="text-green-500 text-xs py-1 px-3 bg-gray-700 bg-opacity-60 rounded-full">{enterState}</div>
        </div>
    );
};

export default ProfileCard;