import type { NextPage } from 'next'
import Head from 'next/head'
import Background from '@/components/background'

const ViewOwnProfie = () => {
    return (
        <div className="h-screen w-screen" style={{ backgroundColor: '#282828' }}>
            <Head>
                <title>View Your Profile</title>
                <meta name="description" content="View Own Profile"/>
                <link rel="icon" href="matchify_logo.svg" type="image/gif" sizes="16x16"></link>
            </Head>
            <div className="h-full w-full p-8">
                {/* Back Arrow */}
                <button className="mb-4">
                    <img src="/left_arrow.svg" alt="Left Arrow" className="w-8 h-8"
                        // Hover animation
                        style={{ transition: 'filter 0.3s ease' }}
                        onMouseEnter={(e) => e.currentTarget.style.filter = 'invert(35%) sepia(99%) saturate(748%) hue-rotate(86deg) brightness(92%) contrast(101%)'}
                        onMouseLeave={(e) => e.currentTarget.style.filter = 'none'}
                    />
                </button>
                <div className="mb-4">
                    <p className="text-white font-bold text-2xl">View Your Profile</p>
                </div>

                {/* Centred Items */}
                <div className="flex flex-col h-full w-full justify-center items-center -mt-32">
                    <div>
                        <p className='text-white'>PROFILE PIC HERE</p>
                    </div>
                    <div className="text-center w-2/3 mt-10">
                        <p className="text-white text-2xl font-bold">Username</p>
                    </div>

                    <button className="w-3/4 bg-black h-10 z-10 rounded-xl text-center z-10 mt-10">
                        <div className="flex w-full h-full z-10">
                            <div className="flex w-full items-center justify-center">
                                <img src="/spotify_logo_green.png" className="w-6 h-6 z-10 mr-2"></img>
                                <p className="text-green-500">Spotify Stats</p>
                            </div>
                        </div>
                    </button>

                    <div className="flex w-3/4 justify-between mt-10">
                        <button className="w-1/2 bg-spotify-green h-10 z-10 rounded-xl text-center z-10 mr-2">
                            <div className="flex w-full h-full z-10">
                                <div className="flex w-full items-center justify-center">
                                    <p className="text-white">Edit Profile</p>
                                </div>
                            </div>
                        </button>
                        <button className="w-1/2 bg-white h-10 z-10 rounded-xl text-center z-10 ml-2">
                            <div className="flex w-full h-full z-10">
                                <div className="flex w-full items-center justify-center">
                                    <p className="text-spotify-green">Settings</p>
                                </div>
                            </div>
                        </button>
                    </div>
                    
                    {/* Profile, Playlist, Activity */}
                    <div className="flex w-full justify-around mt-10">
                        {/* Profile */}
                        <div>
                            <p className="text-white text-2xl font-bold underline">Profile</p>
                        </div>

                        {/* Playlist */}
                        <div>
                            <p className="text-white text-2xl font-bold underline">Playlist</p>
                        </div>

                        {/* Activity */}
                        <div>
                            <p className="text-white text-2xl font-bold underline">Activity</p>
                        </div>
                    </div>
                    
                </div>

            </div>

        </div>
    );
};

export default ViewOwnProfie;