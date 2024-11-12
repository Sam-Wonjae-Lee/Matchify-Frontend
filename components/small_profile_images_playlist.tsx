interface smallProfileImagesProps {
    friendImage1?: string;
    friendName1?: string;
}

const SmallProfileImages: React.FC<smallProfileImagesProps> = ({ friendImage1, friendName1 }) => {
    const renderText = () => {
        let res = "";

        if (friendName1) {
            res += friendName1;
        }
        return res;
    };
    return (
    <div className="flex items-center space-x-4">
        <div className="relative flex items-center">
            {friendImage1 && (
                <img
                    src={friendImage1} 
                    alt={friendName1}
                    className={`w-7 h-7 rounded-full`} // Adjusted size
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