import React from "react";

interface CreateNewChatProps {
    pfp: string;
    name: string;
}

const CreateNewChatCard: React.FC<CreateNewChatProps> = ({pfp, name}) => {
    return (
        <div className="flex items-center p-4"> 
            <img src={pfp} alt={name} className="rounded-full w-8 h-8 border-2 border-spotify-green object-cover" />
            <div className="w-1/2 ml-4">
                <h4 className="text-white font-bold">{name}</h4>
            </div>
            {/* TODO: Need to implement message sent time */}
        </div>
    );
};

export default CreateNewChatCard