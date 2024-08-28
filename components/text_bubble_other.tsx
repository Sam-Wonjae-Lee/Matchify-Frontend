import React from 'react';

interface TextBubbleOtherProps {
    content: string;
}

const TextBubbleOther: React.FC<TextBubbleOtherProps> = ({ content }) => {
    return (
        <div className="flex justify-start mb-2">
            <div className="max-w-xs p-3 rounded-lg text-white" style={{ backgroundColor: '#D9D9D9' }}>
                <p>{content}</p>
            </div>
        </div>
    );
};

export default TextBubbleOther;