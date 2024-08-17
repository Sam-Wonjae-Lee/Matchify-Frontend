import Head from "next/head";
import { useState, useEffect} from "react";
import { useRouter} from "next/router";
import type { GetServerSideProps, NextPage } from 'next'
import axios from "axios";

import TrackCard from "@/components/track_card";
import ArtistCard from "@/components/artist_card";
import GenreCard from "@/components/genre_card";

interface ProfileData {
    name: string;
    bio: string;
    age: number;
    gender: string;
    location: string;
    pfp: string;
}

interface TrackData {
    id: string;
    name: string;   // Track name
    artists: { name: string }[];
    album: { images: {url: string }[] };    // Album cover that track is related to
}

interface ArtistData {
    id: string;
    name: string;   // Artist name
    images: {url: string }[];
}

interface SpotifyStatsProps {
    profileData: ProfileData;
    topTracks: { items: TrackData[] };
    topArtists: { items: ArtistData[] };
    topGenres: { [genre: string]: number };
}

const SpotifyStats: NextPage<SpotifyStatsProps> = ( { profileData, topTracks, topArtists, topGenres }) => {
    const router = useRouter();

    const [activeTab, setActiveTab] = useState('top tracks');
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
                            className={`text-xl font-bold underline ${activeTab === 'top tracks' ? 'text-white' : 'text-gray-500'}`}
                            onClick={() => setActiveTab('top tracks')}
                        >
                            Top Tracks
                        </button>
                        <button
                            className={`text-xl font-bold underline ${activeTab === 'top artists' ? 'text-white' : 'text-gray-500'}`}
                            onClick={() => setActiveTab('top artists')}
                        >
                            Top Artists
                        </button>
                        <button
                            className={`text-xl font-bold underline ${activeTab === 'top genres' ? 'text-white' : 'text-gray-500'}`}
                            onClick={() => setActiveTab('top genres')}
                        >
                            Top Genres
                        </button>
                    </div>


                    {/* Tab Content */}
                    <div className="w-full mt-[2vh] overflow-default">
                        {activeTab === 'top tracks' && (
                            <div>
                                {topTracks.items.map((track, index) => (
                                    <TrackCard
                                        key={track.id}
                                        trackKey={index + 1}
                                        songName={track.name}
                                        artistName={track.artists.map(artist => artist.name).join(', ')}
                                        songImage={track.album.images[0].url}
                                        onClick={() => console.log(`Track ${track.id} clicked`)}
                                    />
                                ))}
                            </div>
                        )}
                        {activeTab === 'top artists' && (
                            <div>
                                {topArtists.items.map((artist, index) => (
                                    <ArtistCard 
                                        key={artist.id} 
                                        ArtistKey={index + 1}
                                        artistName={artist.name}
                                        artistImage={artist.images[0]?.url}
                                        onClick={() => console.log(`Artist ${artist.id} clicked`)} 
                                    />
                                ))}
                            </div>
                        )}
                        {activeTab === 'top genres' && (
                            <div>
                                {/* {topGenres.items.map((genre, index) => (
                                    <GenreCard 
                                        key={index} 
                                        genreKey={index + 1}
                                        genreName={genre}
                                        onClick={() => console.log(`Genre ${index + 1} clicked`)} 
                                    />
                                ))} */}
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

    // const topTracksData = topTracks.data.items.map((track: any) => ({
    //     trackName: track.name,
    //     artistName: track.artists[0].name,
    //     albumImageUrl: track.album.images[0].url,
    //     // artistNames: track.artists.map((artist: any) => artist.name).join(', ')
    // }));

    return {
        props: {
            id,
            profileData,
            topTracks: topTracks.data,
            topArtists: topArtists.data,
            topGenres: topGenres.data,
        },
    };
};

export default SpotifyStats;