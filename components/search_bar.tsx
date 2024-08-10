// SearchBar.tsx
import React from 'react';

interface SearchBarProps {
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onChange, onKeyDown }) => {
    return (
        <div
            style={{ backgroundColor: '#535353', color: '#535353', borderColor: '#535353', width: '325px' }}
            className="flex items-center rounded-md px-4 py-2 w-80">
            <img src="/search_icon.svg" alt="Search Icon" className="w-4 h-4 mr-2" />
            <input
                type="text"
                placeholder={placeholder}
                onChange={onChange}
                onKeyDown={onKeyDown}
                style={{ backgroundColor: '#535353', color: '#FFFFFF', borderColor: '#535353' }}
                className="outline-none placeholder-gray-400 w-full" />
        </div>
    );
};

export default SearchBar;