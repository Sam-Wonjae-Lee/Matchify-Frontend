import React from 'react';

interface TextBubbleUserProps {
    content: string;
}

const TextBubbleUser: React.FC<TextBubbleUserProps> = ({ content }) => {
    return (
        <div className="flex justify-start mb-2">
            <div className="max-w-xs p-3 rounded-lg text-white" style={{ background: 'linear-gradient(45deg, #0D5326, #1DB954)' }}>
                <p>{content}</p>
            </div>
        </div>
    );
};

export default TextBubbleUser;