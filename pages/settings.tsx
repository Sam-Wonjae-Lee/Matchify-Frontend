import type { NextPage } from "next"
import Head from "next/head"
import Background from "@/components/background"

const Settings = () => {
    return (
        <div className="h-screen w-screen" style={{ backgroundColor: '#282828' }}>
            <Head>
                <title>Settings</title>
                <meta name="description" content="Settings"/>
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
                    <p className="text-white font-bold text-2xl">Settings</p>
                </div>

                {/* Centred Items */}
                <div className="flex flex-col h-full w-full justify-center items-center -mt-32">
                    <div>
                        <p className="text-white font-bold">Appearance</p>
                        <div className="flex items-center space-x-40">
                            <p className="text-white">Dark Mode</p>
                            <label className="switch">
                                <input type="checkbox"/>
                                <span className="slider round"></span>
                            </label>
                        </div>
                    </div>
                    <div>
                        <p className="text-white font-bold">Privacy</p>
                        {/* <div className="flex items-center space-x-40">
                            <p className="text-white">Allow only friends to message you</p>
                            <label className="switch">
                                <input type="checkbox"/>
                                <span className="slider round"></span>
                            </label>
                            <p className="text-white">Profile visible to friends only</p>
                            <label className="switch">
                                <input type="checkbox"/>
                                <span className="slider round"></span>
                            </label>
                        </div> */}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Settings;