import { useEffect, useState } from "react";
import Head from "next/head";
import Background from "@/components/background";
import React from "react";
import { useRouter } from "next/router";
import axios from "axios";

const LoginSuccess = () => {
    // Used for redirecting to another page
    const router = useRouter();
    // Specified for home.tsx page
    const handleHomeRedirect = () => {
        router.push('/home');
    };

    /* determines if the screen should display the account created successfully page
     or the login successful page */
    const [isCreation, setIsCreation] = useState(false);

    const updateUserVector = async () => {
        const topTracks = await axios.get(`http://localhost:8888/spotify/user/${sessionStorage.getItem("userId")}/top-tracks`);
        const trackIDs = topTracks.data.items.map((song : any) => song.id);
        console.log(trackIDs);

        const audioFeaturesResponse = await axios.get(`http://localhost:8888/spotify/audio-features`, {
            params: {
                ids: trackIDs,
                user_id: sessionStorage.getItem("userId"),
            }
        });

        console.log(audioFeaturesResponse.data);


        // Extract relevant features from the audio features data
        const audioFeatures = audioFeaturesResponse.data.audio_features;

        // Now, calculate the average values for the user vector
        const userVector = {
            popularity: 0,
            danceability: 0,
            energy: 0,
            valence: 0,
            acousticness: 0,
            speechiness: 0,
            instrumentalness: 0
        };

        topTracks.data.items.forEach((song: any) => {
            userVector.popularity += song.popularity;
        })
        userVector.popularity /= 100.0;

        audioFeatures.forEach((feature: any ) => {
            userVector.danceability += feature.danceability;
            userVector.energy += feature.energy;
            userVector.valence += feature.valence;
            userVector.acousticness += feature.acousticness;
            userVector.speechiness += feature.speechiness;
            userVector.instrumentalness += feature.instrumentalness;
        });

        // Average out the values
        for (let key in userVector) {
            userVector[key] /= 5;
        }

        console.log("User Vector:", userVector);

        const res = await axios.post(`http://localhost:8888/user/vector/${sessionStorage.getItem("userId")}`, {
            body: {
                vector: userVector,
            }
        });

        console.log(res.data)
    }

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        updateUserVector();
        const isCreation = params.get('isCreation');
        if (isCreation == "true") {
            setIsCreation(true);
        }
    }, [])

    return (
        <div className="h-screen w-screen">
            <Head>
                <title>Login Success</title>
                <meta name="description" content="Profile Creation Screen"/>
                <link rel="icon" href="matchify_logo.svg" type="image/gif" sizes="16x16"></link>
            </Head>
            <Background image="/bg1.jpg" alt="Concert Background"></Background>
            <div className="dark-overlay"></div>
            {isCreation && (<div className="flex flex-col items-center justify-center h-full w-full">
                <img src="/green_checkmark.svg" alt="green check mark" className="z-10 w-26 h-26"></img>
                <h2 className="z-10 font-bold text-3xl text-white">Well Done!</h2>
                <p className="w-2/3 text-center mt-5 z-10 text-white">You have successfully created your Matchify account!</p>
                <button className="w-2/3 bg-spotify-green h-14 z-10 rounded text-center mt-20 text-white" onClick={handleHomeRedirect}>Home</button>
            </div>)}
            {!isCreation && (<div className="flex flex-col items-center justify-center h-full w-full">
                <img src="/green_checkmark.png" alt="green check mark" className="z-10 w-26 h-26"></img>
                <h2 className="z-10 font-bold text-3xl text-white">Logged In!</h2>
                <p className="w-2/3 text-center mt-5 z-10 text-white">You have successfully logged in to your Matchify account!</p>
                <button className="w-2/3 bg-spotify-green h-14 z-10 rounded text-center mt-20 text-white" onClick={handleHomeRedirect}>Home</button>
            </div>)}
        </div>
    );

};

export default LoginSuccess;