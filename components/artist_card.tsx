import React from 'react';

interface ArtistCardProps {
    ArtistKey: number;   // Index of the artist
    artistName: string;
    artistImage: string;
    onClick: () => void;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ ArtistKey, artistName, artistImage, onClick }) => {
    return (
        <div className="flex items-center justify-start p-2 rounded-md shadow-md mb-2" style={{ backgroundColor: '#535353' }}>
            <div className="flex items-center justify-center w-3 h-3 mx-3.5"> {/* Increased margin on both sides */}
                <h1 className="text-lg text-white">{ArtistKey}.</h1>
            </div>
            <img src={artistImage} alt={`${artistImage}'s profile`} className="w-14 h-14 mr-2" />
            <div className="flex flex-col">
                <h2 className="text-base font-bold text-white mb-1">{artistName}</h2>
            </div>
        </div>
    );
};
export default ArtistCard;