import React from "react";

const Playlist = () => {

  const showSelectionCard = () => {
    const sliderElement = document.getElementById("select");

    if (sliderElement) {
        sliderElement.style.display = "flex";
        sliderElement.classList.remove("animate-slideDown");
        sliderElement.classList.add("animate-slideUp");
        console.log("Slider wdwdd");
    } else {
        console.log("Slider element not found");
    }
}

  return (
    <div className="w-full h-full box-border p-2 rounded-xl text-white font-sans">
      <div className="flex items-center p-4 bg-[#535353] rounded-tl-md rounded-tr-md">
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
      <div className="">
        <Song title="Blinding Lights" artist="The Weeknd" duration="3:20" index={1} />
        <Song title="Sanctuary" artist="Joji" duration="3:00" index={2}/>
        <Song title="skeletons" artist="keshi" duration="2:32" index={3}/>
        <Song title="drunk" artist="keshi" duration="3:47" index={4}/>
        <Song title="Starboy" artist="The Weeknd" duration="3:50" index={5}/>
        <Song title="Die For You" artist="The Weeknd" duration="4:20" index={6} last={true}/>
      </div>
      <button className="w-full bg-spotify-green h-14 z-10 rounded text-center text-white mt-5" onClick={showSelectionCard}>Change Matchify Playlist</button>
      <div id="select" className="hidden fixed flex flex-col items-center w-[calc(100%-5rem)] h-[50vh] bg-gray-500 z-30 bottom-40 rounded-md">
        <div className="w-[80%] h-[40%] bg-gray-500 text-center">Will do Later</div>
      </div>
    </div>
  );
};

const Song = ({ title, artist, duration, index, last = false }: { title: string, artist: string, duration: string, index: number, last?: boolean}) => {
  const lastSong = " rounded-bl-md rounded-br-md";
  let containerClass = "flex justify-between items-center py-3 px-4 bg-[#4A4A4A]"
  if (last) {
    containerClass += lastSong;
  }
  return (
    <div className={containerClass}> {/* Lighter background color */}
      <div className="flex items-center">
        <div className="mr-4 text-xs">
          {index}
        </div>
        <div>
          <p className="text-xs font-medium text-[#D3D3D3]">{title}</p> {/* Lighter grey color */}
          <p className="text-[0.6rem] text-[#E0E0E0]">{artist}</p> {/* Even lighter grey color */}
        </div>
      </div>
      <p className="text-xs text-[#E0E0E0]">{duration}</p> {/* Even lighter grey color */}
    </div>
  );
};

export default Playlist;