import React from 'react';
import SmallProfileImage from './small_profile_images';

interface ConcertDisplayProps {
    concert_cover: string;
    concert_name: string;
    profile_pic?: string;
    friend_name?: string;
}

const ConcertDisplay: React.FC<ConcertDisplayProps> = ({ concert_cover, concert_name, profile_pic, friend_name }) => {
    return (
        <div className="concert-display" style={{ width: '55vw', maxWidth: '500px' }}> {/* Responsive width */}
            <div 
                className="relative overflow-hidden" 
                style={{ width: '100%', height: '35vw', maxHeight: '300px' }} /* Scales height with screen width */
            >
                <img 
                    src={concert_cover} 
                    alt={concert_name} 
                    className="object-cover w-full h-full"
                />
            </div>
            <h2 className="text-left mt-2 text-sm md:text-base font-medium truncate pl-1">
                {concert_name}
            </h2>
            {/* Uncomment if needed */}
            {/* <div className="mt-1">
                <SmallProfileImage
                    friendImage1={profile_pic}
                    friendName1={friend_name}
                />
            </div> */}
        </div>
    );
}

export default ConcertDisplay;