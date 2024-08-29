
import React, { useState, useRef, useEffect } from 'react';



interface EventCardProps {
    name: string;
    onClick: () => void;
    // options_lst: string[];
}
    const options = [
        'Action', 'Comedy', 'Fantasy', 'Horror', 'Adventure', 'Drama', 
        'Sci-Fi', 'Mystery', 'Romance', 'Slice of Life'
    ]; // Example options, you can customize these

const EventCard: React.FC<EventCardProps> = ({ name, onClick }) => {
    const [bgColor, setBgColor] = useState('#535353');
    const [isPopUpVisible, setIsPopUpVisible] = useState(false);
    const [popUpStyle, setPopUpStyle] = useState({});
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const tabRef = useRef<HTMLDivElement>(null);
    const popUpRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {

        setBgColor(prevColor => prevColor === '#535353' ? '#1DB954' : '#535353'); // Toggle color
        setIsPopUpVisible(!isPopUpVisible); // Toggle pop-up visibility

        if (tabRef.current) {
            const rect = tabRef.current.getBoundingClientRect();
            setPopUpStyle({
                top: `${rect.bottom + window.scrollY}px`, // Position below the tab
                left: `${rect.left + window.scrollX}px`, // Align with the left edge of the tab
                width: '50%', // Adjust width as needed
                height: '300px', // Adjust height as needed
                position: 'fixed', // Use fixed positioning
                zIndex: 50,
            });
        }

        onClick();
    };

    const handleCheckboxChange = (option: string) => {
        setSelectedOptions(prevSelected => 
            prevSelected.includes(option) 
            ? prevSelected.filter(o => o !== option) 
            : [...prevSelected, option]
        );
    };

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                popUpRef.current &&
                !popUpRef.current.contains(event.target as Node) &&
                tabRef.current &&
                !tabRef.current.contains(event.target as Node)
            ) {
                setIsPopUpVisible(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <>
            <div
                ref={tabRef}
                className="flex flex-col items-center justify-center p-1 rounded-lg shadow-md mb-2 flex-1"
                style={{ backgroundColor: bgColor, minWidth: '35%' }} // Ensure minimum width for each tab
                onClick={handleClick}
            >
                <p className="text-white text-xs">{name}</p>
            </div>

            {isPopUpVisible && (
                <div
                    ref={popUpRef}
                    className="fixed z-10 p-2 bg-white rounded-lg shadow-lg"
                    style={popUpStyle}
                >
                    <div className="flex flex-col">
                        {options.map(option => (
                            <label key={option} className="flex items-center mb-1">
                                <input 
                                    type="checkbox" 
                                    checked={selectedOptions.includes(option)} 
                                    onChange={() => handleCheckboxChange(option)} 
                                    className="mr-2"
                                />
                                <span className="text-gray-800">{option}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default EventCard;

// import React, { useState, useRef, useEffect } from 'react';

// interface EventCardProps {
//     name: string;
//     onClick: () => void;
// }

// const EventCard: React.FC<EventCardProps> = ({ name, onClick }) => {
//     const [bgColor, setBgColor] = useState('#535353');

//     const [isPopUpVisible, setIsPopUpVisible] = useState(false);
//     const [popUpStyle, setPopUpStyle] = useState({});
//     const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
//     const tabRef = useRef<HTMLDivElement>(null);
//     const popUpRef = useRef<HTMLDivElement>(null);

//     const handleClick = () => {
//         setBgColor(prevColor => prevColor === '#535353' ? '#1DB954' : '#535353'); // Toggle color
//         setIsPopUpVisible(!isPopUpVisible); // Toggle pop-up visibility

//         if (tabRef.current) {
//             const rect = tabRef.current.getBoundingClientRect();
//             setPopUpStyle({
//                 top: `${rect.bottom + window.scrollY}px`, // Position below the tab
//                 left: `${rect.left + window.scrollX}px`, // Align with the left edge of the tab
//                 width: '50%', // Adjust width as needed
//                 height: '300px', // Adjust height as needed
//                 position: 'fixed', // Use fixed positioning
//                 zIndex: 50,
//             });
//         }

//         onClick();
//     };

//     return (
//         <div 
//             className="flex flex-col items-center justify-center p-1 rounded-lg shadow-md mb-2 flex-1"
//             style={{ backgroundColor: bgColor, minWidth: '35%' }} // Ensure minimum width for each tab
//             onClick={handleClick}
//         >
//             <p className="text-white text-xs">{name}</p>
//         </div>
//     );
// };

// export default EventCard;