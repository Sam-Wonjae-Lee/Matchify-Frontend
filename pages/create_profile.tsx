import type { NextPage } from 'next'
import { useState } from 'react'
import Background from '@/components/background'
import Head from 'next/head'
import { useRouter } from 'next/router';
import axios from 'axios';

const CreateProfile: NextPage = () => {

  const router = useRouter();

  // toggles between first and second page
  const [firstHalfDone, setFirstHalfDone] = useState(false);

  // input states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");

  const handleCreateProfile = async () => {

    const profileData = JSON.parse(sessionStorage.getItem("profileData") || "ERROR");
    
    const response = await axios.post("http://localhost:8888/spotify/auth/create", {user_id: profileData.id, username: profileData.display_name, first_name: firstName, last_name: lastName, location: location, dob, bio, email, profile_pic: profileData.images[0].url, favourite_playlist: "None", gender})

    if (response.data.success) {
      sessionStorage.removeItem("profileData");
      router.push("/login_success?isCreation=true");
    }
    else {console.log(response.data.message);}
  }

  return (
    <div className="h-screen w-screen">
      <Head>
        <title>Create Profile</title>
        <meta name="description" content="Profile Creation Screen"/>
        <link rel="icon" href="matchify_logo.svg" type="image/gif" sizes="16x16"></link>
      </Head>
      <Background image="/bg1.jpg" alt="Concert Background"></Background>
      {/* Make background image darker */}
      <div className="dark-overlay"></div>
      {!firstHalfDone && (<div className="flex flex-col items-center h-full w-full z-10">
        <h1 className="mb-14 font-bold text-2xl z-10 mt-20 text-white">Create Profile</h1>
        <img id="profilepic" src="/default_pfp.png" className="z-10 w-24 h-24 mb-2"></img>
        <div className="text-xs mb-14 z-10">
          <label htmlFor="profilepic" className="text-white">Profile Picture</label>
        </div>
        <div className="flex flex-col items-center w-full z-10">
          <div className="w-2/3 text-xs">
            <label htmlFor="firstname" className="text-white">First Name</label>
          </div>
          <input type="text" id="firstname" name="first name" placeholder="John" className="flex w-2/3 h-10 z-10 rounded mb-8 opacity-75 text-black" value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>
          <div className="w-2/3 text-xs">
            <label htmlFor="lastname" className="text-white">Last Name</label>
          </div>
          <input type="text" id="lastname" name="last name" placeholder="Doe" className="flex w-2/3 h-10 z-10 rounded mb-8 opacity-75 text-black" value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
          <div className="w-2/3 text-xs">
            <label htmlFor="email" className="text-white" opacity-75>Email</label>
          </div>
          <input type="text" id="email" name="email" placeholder="JohnDoe@gmail.com" className="flex w-2/3 h-10 z-10 rounded mb-10 opacity-75 text-black" value={email} onChange={(e) => setEmail(e.target.value)}></input>
          <button className="w-2/3 bg-spotify-green h-14 z-10 rounded text-center text-white" onClick={() => {setFirstHalfDone(true)}}>Next</button>
        </div>
      </div>)}
      {firstHalfDone && (<div className="flex flex-col items-center h-full w-full z-10">
        <h1 className="mb-14 font-bold text-2xl z-10 mt-20 text-white">About Yourself</h1>
        <div className="flex flex-col items-center w-full z-10">
          <div className="w-2/3 text-xs">
            <label htmlFor="location" className="text-white">Location</label>
          </div>
          {/* The location input should be a dropdown?? */}
          <input type="text" id="location" name="location" placeholder="Toronto, Canada" className="flex w-2/3 h-10 z-10 rounded mb-8 opacity-75 text-black" value={location} onChange={(e) => setLocation(e.target.value)}></input>
          <div className="w-2/3 text-xs">
            <label htmlFor="dob" className="text-white">Date of Birth</label>
          </div>
          <input type="date" id="dob" name="date of birth" className="w-2/3 h-10 z-10 rounded mb-8 opacity-75 text-black" value={dob} onChange={(e) => setDob(e.target.value)}></input>
          <div className="w-2/3 text-xs">
            <label htmlFor="gender" className="text-white" opacity-75>Gender</label>
          </div>
          <select id="gender" className="flex w-2/3 h-10 z-10 rounded mb-10 opacity-75 text-black" value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="PreferNotToSay">Prefer Not To Say</option>
          </select>
          <div className="w-2/3 text-xs">
            <label htmlFor="bio" className="text-white" opacity-75>Bio</label>
          </div>
          <textarea id="bio" name="bio" placeholder="Write a quick summary about yourself and your music taste!" className="w-2/3 h-20 z-10 rounded mb-8 opacity-75 text-black text-xs" value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
          <div className="flex justify-between w-2/3">
            <button className="w-[47%] bg-white h-14 z-10 rounded text-center text-spotify-green" onClick={() => {setFirstHalfDone(false)}}>Back</button>
            <button className="w-[47%] bg-spotify-green h-14 z-10 rounded text-center text-white" onClick={handleCreateProfile}>Finish</button>
          </div>
        </div>
      </div>)}
    </div>
  )
}

export default CreateProfile
