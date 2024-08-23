import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { AreYouSureCard, showAreYouSureCard } from './are_you_sure_card';

import axios from 'axios';

interface FriendCardProps {
    key: number;
    bio: string;
    name: string;
    pfp: string;
    userID: string;
    setAreYouSureText: any;
    setAreYouSureFunc: any;
    enterState: 'Friend' | 'Request' | 'Cancel';
}


const ProfileCard: React.FC<FriendCardProps> = ({key, bio, name, pfp, userID, enterState = 'Friend', setAreYouSureText, setAreYouSureFunc}) => {

    const router = useRouter();

    const [state, setState] = useState(enterState);
    const [buttonColor, setButtonColor] = useState("#1DB954");

    const handleProfileRedirect = () => {
        router.push("/profile/" + userID);
    }

    const handleStateClick = (event: any) => {
        event.stopPropagation();
        if (state == 'Friend') {
            setAreYouSureText("Are you sure you want to unfriend " + name+ "? You will no longer see their updates or be able to interact with them as friends. This action cannot be undone.");
            showAreYouSureCard("unfriend_popup")
            setAreYouSureFunc(() => handleUnfriend);
        }
        else if (state == 'Request') {
            setState('Cancel');
            handleSendFriendRequest();
        }
        else if (state == 'Cancel') {
            setAreYouSureText("Are you sure you want to cancel your friend request to " + name + "?.");
            showAreYouSureCard("cancel_popup")
            setAreYouSureFunc(() => handleCancelFriendRequest);
        }
        else {
            console.log("Error: Invalid State");
        }
        console.log("HELLO");
    }

    const handleSendFriendRequest = async () => {
        const response = await axios.post("http://localhost:8888/friend_request/send_friend_request", {senderID: sessionStorage.getItem("userId"), receiverID: userID});
        setButtonColor("#DC2626");
        setState('Cancel');
    }

    const handleUnfriend = async () => {
        const response = await axios.post(`http://localhost:8888/user/unfriend/${sessionStorage.getItem("userId")}`, {unfriended: userID});
        setButtonColor("#0094CA");
        setState('Request');
    }

    const handleCancelFriendRequest = async () => {
        const response = await axios.post("http://localhost:8888/friend_request/unsend_friend_request", {senderID: sessionStorage.getItem("userId"), receiverID: userID});
        setButtonColor("#0094CA");
        setState('Request');
    }

    const pressDownHighlight = (id: string) => {
        const sliderPart = document.getElementById(id);
    
        if(sliderPart) {
            sliderPart.style.backgroundColor = "#535353";
        }
    }
    
    const pressUpHighlight = (id: string) => {
        const sliderPart = document.getElementById(id);

        if(sliderPart) {
            sliderPart.style.backgroundColor = "rgb(107, 114, 128)";
        }
    }

    useEffect(() => {
        console.log(state);
        if (state == 'Friend') {
            setButtonColor("#1DB954");
        }
        else if (state == 'Request') {
            setButtonColor("#0094CA");
        }
        else if (state == 'Cancel') {
            setButtonColor("#DC2626");
        }
        else {
            console.log("Error: Invalid State");
        }
    }, [state])

    return (
        <div id={"profile_card_" + key} className="flex items-center p-4 mb-4 bg-[#535353] bg-opacity-60 rounded-lg" 
        onClick={handleProfileRedirect}
        onTouchStart={() => pressUpHighlight("profile_card_" + key)}
        onTouchEnd={() => pressDownHighlight("profile_card_" + key)}>
            <img src={pfp} alt={name} className="rounded-full w-12 h-12 border-2 border-spotify-green object-cover" />
            <div className="w-1/2 ml-4">
                <h4 className="text-white font-bold">{name}</h4>

                {/* Bio for now unless we want to use matching statistics here later on */}
                <p className="text-white text-xs">{bio}</p>
            </div>
            <button className="w-1/3 bg-[#0094CA] h-7 z-10 rounded-lg text-center z-10 text-xs" 
            onClick={handleStateClick}
            onTouchStart={(event) => event.stopPropagation()}
            onTouchEnd={(event) => event.stopPropagation()}
            style={{backgroundColor: buttonColor}}>
                {state}
            </button>
        </div>
    );
};

export default ProfileCard;