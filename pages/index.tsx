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
    <div className="h-screen w-screen">
      <Head>
        <title>Welcome to Matchify</title>
        <meta name="description" content="Entry point"/>
        <link rel="icon" href="matchify_logo.svg" type="image/gif" sizes="16x16"></link>
      </Head>
      <Background image="/bg1.jpg" alt="Concert Background"></Background>
      {/* Make background image darker */}
      <div className="dark-overlay"></div>
      <div className="flex flex-col h-full w-full justify-center items-center z-10">
        <div className="z-10">
          <img src="matchify_logo.svg"></img>
        </div>
        <div className="text-center w-2/3 z-10 mt-10">
          <p className="text-white text-3xl font-bold">Matchify</p>
        </div>
        <div className="text-center w-2/3 z-10 mt-10">
          <p className="text-white">Meet new people and attend events based on your music tastes using your Spotify profile!</p>
        </div>

        {/* Continue With Spotify Button */}
        <button className="w-2/3 bg-spotify-green h-10 z-10 rounded text-center z-10 mt-10" onClick={handleSpotifyAuth}>
          <div className="flex w-full h-full z-10">
            <div className="flex w-full items-center justify-center">
              <p className="text-white">Continue With Spotify</p>
              <img src="/spotify_logo_white.png" className="w-8 h-8 z-10 ml-2"></img>
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}

export default Entry