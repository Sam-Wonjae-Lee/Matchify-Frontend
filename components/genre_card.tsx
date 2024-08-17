import React from 'react';

interface GenreCardProps {
    genreKey: number;   // Index of the genre
    genreName: string;
    onClick: () => void;
}

const GenreCard: React.FC<GenreCardProps> = ({ genreKey, genreName, onClick }) => {
    return (
        <div className="flex items-center justify-start p-2 rounded-md shadow-md mb-2" style={{ backgroundColor: '#535353' }}>
            <div className="flex items-center justify-center w-3 h-3 mx-3.5"> {/* Increased margin on both sides */}
                <h1 className="text-lg text-white">{genreKey}.</h1>
            </div>
            <div className="flex flex-col">
                <h2 className="text-base font-bold text-white mb-1">{genreName}</h2>
            </div>
        </div>
    );
};
export default GenreCard;