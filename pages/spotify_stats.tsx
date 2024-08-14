import Head from "next/head";
import TrackCard from "@/components/track_card";
import { useState, useEffect} from "react";
import { useRouter} from "next/router";
import type { GetServerSideProps, NextPage } from 'next'

interface ProfileProps {
    id: string,
    profileData: any
}

interface ProfileData {
    name: string;
    bio: string;
    age: number;
    gender: string;
    location: string;
    pfp: string;
}



const SpotifyStats: NextPage<ProfileProps> = ( {id, profileData}) => {
    const router = useRouter();
    const [viewer, setViewer] = useState("Anon");
    const [profile, setProfile] = useState<ProfileData>(() => profileData);

    const handleProfileRedirect = () => {
        // HERE WE NEED TO ACCESS SESSION STORAGE
        const user_id = sessionStorage.getItem("user_id") || "Anon"
        router.push('/profile/' + user_id);
    }

    return (
        <div className="min-h-screen w-screen" style={{ backgroundColor: '#282828' }}>
            <Head>
                {profile && (<title>{profile.name}'s Profile</title>)}
                <meta name="description" content="Profile Content"/>
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
                         onClick={handleProfileRedirect}
                    />
                </button>
                <div className="w-full mt-[2vh]">
                    {viewer && profile && (<p className="text-white font-bold text-2xl">{id == viewer ? "View Own Profile" : profile.name + "'s Profile"}</p>)}
                </div>
            </div>
        </div>
    );
};

export default SpotifyStats;