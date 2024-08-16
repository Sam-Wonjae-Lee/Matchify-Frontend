import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

interface PlaylistProps {
  playlists: any
  username: string
  fav: string
}

const Playlist: React.FC<PlaylistProps> = ({playlists, username, fav}) => {

  const [currFav, setCurrFav] = useState(playlists.items[0]);
  const [currFavTracks, setCurrFavTracks] = useState<any>([]);

  useEffect(() => {

    const fetchFavTracks = async () => {
      const response = await axios.post(`http://localhost:8888/spotify/playlists/${currFav.id}/tracks`, {user_id: sessionStorage.getItem("userId"), limit: 50, offset: 0});
      setCurrFavTracks(response.data.items);
    }

    if (currFav && Object.keys(currFav).length > 0) {
      fetchFavTracks();
    }
  }, [currFav])

  useEffect(() => {
    if (fav == "None") {
      return;
    }
    for (let i = 0; i < playlists.items.length; i++) {
      if (fav == playlists.items[i].id) {
        setCurrFav(playlists.items[i]);
      }
    }
  }, [])

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

  const removeSlider = () => {
    const sliderElement = document.getElementById("select");

    if (sliderElement) {
        sliderElement.style.display = "none"
    } else {
        console.log("Slider element not found");
    }
  }

  const pressDownHighlight = (id: string) => {
    const sliderPart = document.getElementById(id);

    if(sliderPart) {
        sliderPart.style.backgroundColor = "rgb(75, 85, 99)";
    }
  }

  const pressUpHighlight = (id: string) => {
      const sliderPart = document.getElementById(id);

      if(sliderPart) {
          sliderPart.style.backgroundColor = "rgb(107, 114, 128)";
      }
  }

  const miliToTextFormat = (mili: number) => {
    const minutes = Math.floor(mili / 1000 / 60);
    const seconds = Math.round((mili - (minutes * 60 * 1000)) / 1000);
    return "" + minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
  }

  return (
    <div className="w-full h-full box-border p-2 rounded-xl text-white font-sans">
      {currFav && Object.keys(currFav).length > 0 && (<div>
        <div className="flex items-center p-4 bg-[#535353] rounded-tl-md rounded-tr-md">
          <img
            src={currFav.images[0].url} // Replace with your image URL
            alt="Playlist Cover"
            className="w-20 h-20 rounded-lg object-cover"
          />
          <div className="ml-4">
            <h2 className="text-xl font-semibold">{currFav.name}</h2>
            <p className="text-sm text-[#B3B3B3]">{username}</p>
          </div>
        </div>
        <div className="">
          {currFavTracks && currFavTracks.length > 0 && currFavTracks.map((data: any, index: number) => (<Song title={data.track.name} artist={data.track.artists[0].name} duration={miliToTextFormat(data.track.duration_ms)} index={index + 1} />))}
        </div>
      </div>)}
      <button className="w-full bg-spotify-green h-14 z-10 rounded text-center text-white mt-5" onClick={showSelectionCard}>Change Matchify Playlist</button>
      <div id="select" className="hidden fixed flex flex-col items-center w-[calc(100%-5rem)] h-[45vh] bg-gray-500 z-30 bottom-40 rounded-md">
        <div className="w-[80%] bg-gray-500 text-center text-xl font-bold py-6">Select Matchify Playlist</div>
        <div className="flex flex-row overflow-x-auto no-scrollbar w-[90%] space-x-2 ml-[10%]">
          {playlists.items.map((data: any, index: number) => ( 
          <div id={"playlist_selector" + index} className="flex-none" onTouchStart={() => {pressDownHighlight("playlist_selector" + index)}}
          onTouchEnd={() => {pressUpHighlight("playlist_selector" + index)}} onClick={() => {
            setCurrFav(playlists.items[index]);
            removeSlider();
          }}>
            <img className="h-36 w-36 bg-white" src={data.images[0].url}>
            </img>  
            <div className="font-bold py-1">{data.name}</div>
            <div>{username}</div>
          </div>))}
        </div>
        <button className="bg-red-600 w-[60%] h-12 my-auto rounded-md" onClick={removeSlider}>Cancel</button>
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
        <div className="mr-4 text-xs w-5">
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