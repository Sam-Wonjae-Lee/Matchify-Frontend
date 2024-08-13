import React from 'react';

interface TrackCardProps {
    trackKey: number;
    songName: string;
    artistName: string;
    songImage: string;
    onClick: () => void;
}

const TrackCard: React.FC<TrackCardProps> = ({ trackKey, songName, artistName, songImage, onClick }) => {
    return (
        <div className="flex items-center justify-start p-2 rounded-md shadow-md mb-2" style={{ backgroundColor: '#535353' }}>
            <div className="flex items-center justify-center w-3 h-3 mx-3.5"> {/* Increased margin on both sides */}
                <h1 className="text-lg text-white">{trackKey}.</h1>
            </div>
            <img src={songImage} alt={`${songImage}'s profile`} className="w-14 h-14 mr-2" />
            <div className="flex flex-col">
                <h2 className="text-base font-bold text-white mb-1">{songName}</h2>
                <p className="text-white text-xs">{artistName}</p>
            </div>
        </div>
    );
};
export default TrackCard;