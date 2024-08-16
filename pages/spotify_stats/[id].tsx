import Head from "next/head";
import { useState, useEffect} from "react";
import { useRouter} from "next/router";
import type { GetServerSideProps, NextPage } from 'next'
import axios from "axios";

import TrackCard from "@/components/track_card";
import FriendsPlaylistCard from "@/components/friends_playlist";

interface SpotifyStatsProps {
    id: string,
    profileData: any,
    topTracks: any,
    topArtists: any,
    topGenres: any,
}

interface ProfileData {
    name: string;
    bio: string;
    age: number;
    gender: string;
    location: string;
    pfp: string;
}

interface TrackData {
    artistName: string;
    albumImageUrl: string;
    artistsNames: string;
}

const SpotifyStats: NextPage<SpotifyStatsProps> = ( {id, profileData}) => {
    const router = useRouter();

    const [activeTab, setActiveTab] = useState('top tracks');
    const [tracks, setTracks] = useState<{ id: number; songName: string; artistName: string; songImage: string; }[]>([]);

    useEffect(() => {
        // Fetch tracks data here and set it to state
        // Example data
        setTracks([
            { id: 1, songName: 'Track 1', artistName: 'Artist 1', songImage: 'image1.jpg' },
            { id: 2, songName: 'Track 2', artistName: 'Artist 2', songImage: 'image2.jpg' },
            { id: 3, songName: 'Track 3', artistName: 'Artist 3', songImage: 'image3.jpg' },
            // Add more tracks as needed
        ]);
    }, []);

    const [profile, setProfile] = useState<ProfileData>(() => profileData);

    const handleProfileRedirect = () => {
        // HERE WE NEED TO ACCESS SESSION STORAGE
        const user_id = sessionStorage.getItem("userId") || "Anon"
        router.push('/profile/' + user_id);
    }

    return (
        <div className="min-h-screen w-screen" style={{ backgroundColor: '#282828' }}>
            <Head>
                {profile && (<title>{profile.name}'s Spotify Stats</title>)}
                <meta name="description" content="Spotify Stats"/>
                <link rel="icon" href="/matchify_logo.svg" type="image/svg+xml" sizes="16x16"/>
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
                    <p className="text-white font-bold text-2xl">{profile.name}'s Spotify Stats</p>
                </div>
                
                {/* Centred Items */}
                <div className="relative flex flex-col w-full items-center">

                    {/* Profile Pic */}
                    <div>
                        <img id="profilepic" src={profile.pfp} className="z-10 w-[24vw] h-[24vw] mt-[4vh] rounded-full border-4 border-spotify-green object-cover"></img>
                    </div>
                    <p className="text-white text-2xl font-bold">{profile.name}</p>

                    {/* Profile, Playlist, Activity Tabs */}
                    <div className="flex w-full justify-around mt-[2vh]">
                        <button
                            className={`text-xl font-bold underline ${activeTab === 'profile' ? 'text-white' : 'text-gray-500'}`}
                            onClick={() => setActiveTab('top tracks')}
                        >
                            Top Tracks
                        </button>
                        <button
                            className={`text-xl font-bold underline ${activeTab === 'playlist' ? 'text-white' : 'text-gray-500'}`}
                            onClick={() => setActiveTab('top artists')}
                        >
                            Top Artists
                        </button>
                        <button
                            className={`text-xl font-bold underline ${activeTab === 'activity' ? 'text-white' : 'text-gray-500'}`}
                            onClick={() => setActiveTab('top genres')}
                        >
                            Top Genres
                        </button>
                    </div>


                    {/* Tab Content */}
                    <div className="w-full mt-[2vh] overflow-default">
                        {activeTab === 'top tracks' && (
                            <div>
                                {tracks.map((track, index) => (
                                    <TrackCard
                                        key={track.id}
                                        trackKey={index + 1}
                                        songName={track.songName}
                                        artistName={track.artistName}
                                        songImage={track.songImage}
                                        onClick={() => console.log(`Track ${track.id} clicked`)}
                                    />
                                ))}
                            </div>
                        )}
                        {activeTab === 'top artists' && (
                            <div>
                                <p className="text-white">Artists Content Here</p>
                            </div>
                        )}
                        {activeTab === 'top genres' && (
                            <div>
                                <p className="text-white">Genres Content Here</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    
    // typescript keeps yelling about types
    const { id } = context.params as {id: string};

    // TODO FETCH BACKEND INFO ON PERSON
    console.log("THE ID IS: " + id);
    const profile = await axios.get(`http://localhost:8888/user/get/${id}`);
    const topTracks = await axios.get(`http://localhost:8888/spotify/user/${id}/top-tracks`);
    console.log(topTracks.data);
    const topArtists = await axios.get(`http://localhost:8888/spotify/user/${id}/top-artists`);
    const topGenres = await axios.get(`http://localhost:8888/spotify/user/${id}/top-genres`);


    const profileData = {
        name: profile.data.username,
        bio: profile.data.bio, 
        gender: profile.data.gender, 
        location: profile.data.location, 
        age: "Doing this later", 
        pfp: profile.data.profile_pic, 
        fav_playlist: profile.data.favourite_playlist}

    const topTracksData = topTracks.data.items.map((track: any) => ({
        artistName: track.artists[0].name,
        albumImageUrl: track.album.images[0].url,
        artistNames: track.artists.map((artist: any) => artist.name).join(', ')
    }));
  
    return {
        props: {
            id,
            profileData,
            topTracks: topTracks.data,
            topArtists: topArtists.data,
            topGenres: topGenres.data
        },
    };
};

export default SpotifyStats;