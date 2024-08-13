import axios from 'axios'
import { useEffect, useState } from 'react';

const Callback = () => {

    const [runOnce, setRunOnce] = useState(false);

    useEffect(() => {

        if (runOnce) {
            return;
        }

        const getProfileObject = async (code: string | null) => {
            const response = await axios.post("http://localhost:8888/spotify/auth/callback", {code})
            console.log(response.data);
        }

        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        console.log("Running");
        setRunOnce(true);
        getProfileObject(code);
    }, [runOnce])

    return (
        <div>
            Hello
        </div>
    )
};

export default Callback;