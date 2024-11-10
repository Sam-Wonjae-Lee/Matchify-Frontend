import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from "next/router"
import axios from 'axios'

const Entry: NextPage = () => {
    const handleSpotifyAuth = async () => {
        const response = await axios.get("http://localhost:8888/spotify/auth");
        console.log(response.data)
        window.location.href = response.data;
    }

    return (
        <div className="min-h-screen w-screen flex items-center justify-center bg-[#1C1C1C]">
            <Head>
                <title>Welcome to Matchify</title>
                <meta name="description" content="Entry point"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <link rel="icon" href="matchify_logo.svg" type="image/gif" sizes="16x16"/>
            </Head>

            {/* Phone-like container */}
            <div className="w-full h-screen sm:h-[565px] sm:w-[261px] bg-[#282828] relative overflow-hidden">
                {/* Background image container */}
                <img 
                    src="/bg1.jpg" 
                    alt="Concert Background" 
                    className="absolute w-full h-full object-cover object-center"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40"/>

                {/* Content container */}
                <div className="relative flex flex-col h-full w-full items-center justify-center px-6">
                    <div>
                        <img src="matchify_logo.svg" alt="Matchify Logo" className="w-16 h-16"/>
                    </div>
                    
                    <h1 className="text-white text-3xl font-bold mt-5">
                        Matchify
                    </h1>
                    
                    <p className="text-white text-sm text-center mt-5">
                        Meet new people and attend events based on your music tastes using your Spotify profile!
                    </p>
                    
                    <button 
                        onClick={handleSpotifyAuth}
                        className="w-3/4 sm:w-3/4 lg:w-full h-10 bg-[#1DB954] hover:bg-[#1ed760] transition-colors rounded py-3 mt-10 flex items-center justify-center space-x-2"
                    >
                        <span className="text-white text-xs sm:text-sm lg:text-xs">Continue With Spotify</span>
                        <img src="/spotify_logo_white.png" alt="Spotify Logo" className="w-6 h-6"/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Entry