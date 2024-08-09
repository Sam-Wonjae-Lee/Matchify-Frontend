interface smallProfileImagesProps {
    friendImage1?: string;
    friendImage2?: string;
    friendName1?: string;
    friendName2?: string;
    additionalCount?: number;
}

const SmallProfileImages: React.FC<smallProfileImagesProps> = ({ friendImage1, friendImage2, friendName1, friendName2, additionalCount }) => {
    const renderText = () => {
        let res = "";

        if (friendName1) {
            res += friendName1;
        }
        if (friendName2) {
            res += ` and ${friendName2}`;
        }
        if (additionalCount) {
            res += ` and ${additionalCount} others`;
        }

        if (!friendName1 && !friendName2 && !additionalCount) {
            return ''
        }
        else {
            return res + " are attending this event";
        }
    };
    return (
    <div className="flex items-center space-x-4">
        <div className="relative flex items-center">
            {friendImage1 && (
                <img
                    src={friendImage1} 
                    alt={friendName1}
                    className={`w-7 h-7 rounded-full ${friendImage2 ? 'relative z-10' : ''}`} // Adjusted size
                />
            )}
            {friendImage2 && (
                <img 
                    src={friendImage2} 
                    alt={friendName2} 
                    className="w-7 h-7 rounded-full relative -ml-2 z-0" // Adjusted size
                />
            )}
            <p className="ml-2 text-white text-[10px] sm:text-[12px] break-words max-w-[22ch] relative flex items-start" style={{ marginTop: '2px', lineHeight: '1.2' }}>
                {renderText()}
            </p>
        </div>
    </div>
);
}

export default SmallProfileImages;