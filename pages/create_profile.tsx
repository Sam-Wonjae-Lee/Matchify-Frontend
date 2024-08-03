import type { NextPage } from 'next'
import { useState } from 'react'
import Background from '@/components/background'
import Head from 'next/head'

const CreateProfile: NextPage = () => {

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

  const handleCreateProfile = (): void => {
    // TODO LATER
    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(location);
    console.log(dob);
    console.log(gender);
    console.log(bio);
  }

  return (
    <div className="h-screen w-screen">
      <Head>
        <title>Create Profile</title>
        <meta name="description" content="Profile Creation Screen"/>
      </Head>
      <Background image="/bg1.jpg" alt="Concert Background"></Background>
      {!firstHalfDone && (<div className="flex flex-col items-center h-full w-full z-10">
        <h1 className="mb-14 font-bold text-2xl z-10 mt-20">Create Profile</h1>
        <img id="profilepic" src="/default_pfp.png" className="z-10 w-24 h-24 mb-2"></img>
        <div className="text-xs mb-14 z-10">
          <label htmlFor="profilepic">Profile Picture</label>
        </div>
        <div className="flex flex-col items-center w-full z-10">
          <div className="w-2/3 text-xs">
            <label htmlFor="firstname">First Name</label>
          </div>
          <input type="text" id="firstname" name="first name" placeholder="John" className="flex w-2/3 h-10 z-10 rounded mb-8 opacity-75 text-black" value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>
          <div className="w-2/3 text-xs">
            <label htmlFor="lastname">Last Name</label>
          </div>
          <input type="text" id="lastname" name="last name" placeholder="Doe" className="flex w-2/3 h-10 z-10 rounded mb-8 opacity-75 text-black" value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
          <div className="w-2/3 text-xs">
            <label htmlFor="email" opacity-75>Email</label>
          </div>
          <input type="text" id="email" name="email" placeholder="JohnDoe@gmail.com" className="flex w-2/3 h-10 z-10 rounded mb-10 opacity-75 text-black" value={email} onChange={(e) => setEmail(e.target.value)}></input>
          <button className="w-2/3 bg-spotify-green h-14 z-10 rounded text-center" onClick={() => {setFirstHalfDone(true)}}>Next</button>
        </div>
      </div>)}
      {firstHalfDone && (<div className="flex flex-col items-center h-full w-full z-10">
        <h1 className="mb-14 font-bold text-2xl z-10 mt-20">About Yourself</h1>
        <div className="flex flex-col items-center w-full z-10">
          <div className="w-2/3 text-xs">
            <label htmlFor="location">Location</label>
          </div>
          {/* The location input should be a dropdown?? */}
          <input type="text" id="location" name="location" placeholder="Toronto, Canada" className="flex w-2/3 h-10 z-10 rounded mb-8 opacity-75 text-black" value={location} onChange={(e) => setLocation(e.target.value)}></input>
          <div className="w-2/3 text-xs">
            <label htmlFor="dob">Date of Birth</label>
          </div>
          <input type="date" id="dob" name="date of birth" className="w-2/3 h-10 z-10 rounded mb-8 opacity-75 text-black" value={dob} onChange={(e) => setDob(e.target.value)}></input>
          <div className="w-2/3 text-xs">
            <label htmlFor="gender" opacity-75>Gender</label>
          </div>
          <select id="gender" className="flex w-2/3 h-10 z-10 rounded mb-10 opacity-75 text-black" value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="PreferNotToSay">Prefer Not To Say</option>
          </select>
          <div className="w-2/3 text-xs">
            <label htmlFor="bio" opacity-75>Bio</label>
          </div>
          <textarea id="bio" name="bio" placeholder="Write a quick summary about yourself and your music taste!" className="w-2/3 h-20 z-10 rounded mb-8 opacity-75 text-black text-xs" value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
          <div className="flex justify-between w-2/3">
            <button className="w-[47%] bg-white h-14 z-10 rounded text-center text-spotify-green" onClick={() => {setFirstHalfDone(false)}}>Back</button>
            <button className="w-[47%] bg-spotify-green h-14 z-10 rounded text-center" onClick={handleCreateProfile}>Finish</button>
          </div>
        </div>
      </div>)}
    </div>
  )
}

export default CreateProfile
