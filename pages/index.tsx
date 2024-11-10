import type { NextPage } from 'next'
import Head from 'next/head'
import Background from '@/components/background'
import axios from 'axios'
import { useRouter } from "next/router"

const Entry: NextPage = () => {

    const handleSpotifyAuth = async () => {
        const response = await axios.get("http://localhost:8888/spotify/auth");
        console.log(response.data)
        window.location.href = response.data;
    }

  return (
    <div className="min-h-screen w-screen flex items-center justify-center" style={{ backgroundColor: '#1C1C1C'}}>
      <Head>
        <title>Welcome to Matchify</title>
        <meta name="description" content="Entry point"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="icon" href="matchify_logo.svg" type="image/gif" sizes="16x16"></link>
      </Head>
      <div className="max-w-[100vw] w-full sm:w-[80%] md:w-[261px] h-[565px] bg-[#282828] relative">
        <img src="/bg1.jpg" alt="Concert Background" className="absolute w-full h-full object-cover object-center z-0"></img>
        <div className="dark-overlay"></div>
        <div className="flex flex-col h-full w-full justify-center items-center z-10">
          <div className="z-10">
            <img src="matchify_logo.svg"></img>
          </div>
          <div className="text-center w-2/3 z-10 mt-5">
            <p className="text-white text-3xl font-bold">Matchify</p>
          </div>
          <div className="text-center w-3/4 z-10 mt-5">
            <p className="text-white text-sm">Meet new people and attend events based on your music tastes using your Spotify profile!</p>
          </div>
          <button className="w-3/4 bg-spotify-green h-10 z-10 rounded text-center mt-10" onClick={handleSpotifyAuth}>
            <div className="flex w-full h-full z-10">
              <div className="flex w-full items-center justify-center">
                <p className="text-white text-sm">Continue With Spotify</p>
                <img src="/spotify_logo_white.png" className="w-6 h-6 z-10 ml-2"></img>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Entry;
