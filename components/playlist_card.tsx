import React from "react";

const Playlist = () => {
  return (
    <div className="w-80 bg-[#2A2A2A] p-6 rounded-xl text-white font-sans">
      <div className="flex items-center">
        <img
          src="\best_girl.jpg" // Replace with your image URL
          alt="Playlist Cover"
          className="w-20 h-20 rounded-lg object-cover"
        />
        <div className="ml-4">
          <h2 className="text-xl font-semibold">Vibes</h2>
          <p className="text-sm text-[#B3B3B3]">Lil UX</p>
        </div>
      </div>
      <div className="mt-6">
        <Song title="Blinding Lights" artist="The Weeknd" duration="3:20" />
        <Song title="Sanctuary" artist="Joji" duration="3:00" />
        <Song title="skeletons" artist="keshi" duration="2:32" />
        <Song title="drunk" artist="keshi" duration="3:47" />
        <Song title="Starboy" artist="The Weeknd" duration="3:50" />
        <Song title="Die For You" artist="The Weeknd" duration="4:20" />
      </div>
    </div>
  );
};

const Song = ({ title, artist, duration }: { title: string, artist: string, duration: string }) => {
  return (
    <div className="flex justify-between items-center py-3 px-4 mb-2 rounded-md bg-[#3A3A3A]"> {/* Lighter background color */}
      <div>
        <p className="text-base font-medium text-[#D3D3D3]">{title}</p> {/* Lighter grey color */}
        <p className="text-sm text-[#E0E0E0]">{artist}</p> {/* Even lighter grey color */}
      </div>
      <p className="text-sm text-[#E0E0E0]">{duration}</p> {/* Even lighter grey color */}
    </div>
  );
};

export default Playlist;