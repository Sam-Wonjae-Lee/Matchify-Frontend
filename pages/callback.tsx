import axios from 'axios'
import { useEffect } from 'react'
import Head from 'next/head'

const Callback = () => {

    useEffect(() => {

        const getProfileObject = async (code: string | null) => {
            const response = await axios.post("http://localhost:8888/spotify/auth/callback", {code})
            sessionStorage.setItem("userId", response.data.profileData.id);
            if (response.data.isCreation) {
                sessionStorage.setItem("profileData", JSON.stringify(response.data.profileData));
                window.location.href = "/create_profile";
            }
            else {
                window.location.href = "/login_success?isCreation=false";
            }
        }

        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        console.log("Running");
        getProfileObject(code);
    }, [])

    return (
        <div className="h-screen w-screen" style={{ backgroundColor: '#282828' }}>
            <Head>
                <title>Loading...</title>
                <meta name="description" content="Callback"/>
                <link rel="icon" href="matchify_logo.svg" type="image/gif" sizes="16x16"></link>
            </Head>
            <div className="h-full w-full flex justify-center items-center">
                <p className="text-white text-2xl font-bold">Loading...</p>
            </div>
        </div>
    )
};

export default Callback;