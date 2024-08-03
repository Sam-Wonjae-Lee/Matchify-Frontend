import type { NextPage } from 'next'
import Head from 'next/head'
import Background from '@/components/background'

const Entry: NextPage = () => {

  return (
    <div className="h-screen w-screen">
      <Head>
        <title>Welcome to Matchify</title>
        <meta name="description" content="Entry point"/>
      </Head>
      <Background image="/bg1.jpg" alt="Concert Background"></Background>
      <div className="flex flex-col h-full w-full justify-center items-center z-10">
        <div className="z-10">OUR LOGO HERE</div>
        <div className="text-center w-2/3 z-10 mt-10">
          <p>Meet new people and attend events based on your music tastes using your Spotify profile!</p>
        </div>
        <button className="w-2/3 bg-spotify-green h-10 z-10 rounded text-center z-10 mt-10">
          <div className="flex w-full h-full z-10">
            <div className="flex w-full items-center justify-center">
              <p>Continue With Spotify</p>
              <img src="/spotify_logo_white.png" className="w-8 h-8 z-10 ml-2"></img>
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}

export default Entry
