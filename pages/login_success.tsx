import { useEffect, useState } from "react";
import Head from "next/head";
import Background from "@/components/background";
import React from "react";
import { useRouter } from "next/router";

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

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const isCreation = params.get('isCreation');
        if (isCreation == "true") {
            setIsCreation(true);
        }
    })

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