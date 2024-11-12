interface SmallProfileImagesProps {
    friendImage1?: string;
    friendName1?: string;
}

const SmallProfileImages: React.FC<SmallProfileImagesProps> = ({ friendImage1, friendName1 }) => {
    const renderText = () => {
        let res = "";

        if (friendName1) {
            res += friendName1;
        }
        return res;
    };

    return (
        <div className="flex items-center space-x-2"> {/* Adjusted spacing */}
            <div className="relative flex items-center">
                {friendImage1 && (
                    <img
                        src={friendImage1} 
                        alt={friendName1}
                        className="w-5 h-5 rounded-full" // Adjusted size
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