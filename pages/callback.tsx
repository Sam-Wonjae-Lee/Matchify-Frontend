import axios from 'axios'
import { useEffect } from 'react';

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
        <div>
            Hello
        </div>
    )
};

export default Callback;