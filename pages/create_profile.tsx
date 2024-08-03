import type { NextPage } from 'next'
import Background from '@/components/background'
import Head from 'next/head'

const CreateProfile: NextPage = () => {

  return (
    <div className="h-screen w-screen">
      <Head>
        <title>Create Profile</title>
        <meta name="description" content="Profile Creation Screen"/>
      </Head>
      <Background image="/bg1.jpg" alt="Concert Background"></Background>
      <div className="flex flex-col items-center h-full w-full z-10">
        <h1 className="mb-14 font-bold text-2xl z-10 mt-20">Create Profile</h1>
        <img id="profilepic" src="/default_pfp.png" className="z-10 w-24 h-24 mb-2"></img>
        <div className="text-xs mb-14 z-10">
          <label htmlFor="profilepic">Profile Picture</label>
        </div>
        <form className="flex flex-col items-center w-full z-10">
          <div className="w-2/3 text-xs">
            <label htmlFor="firstname ml-10 opacity-75">First Name</label>
          </div>
          <input type="text" id="firstname" name="first name" className="flex w-2/3 h-10 z-10 rounded mb-8 opacity-75" required></input>
          <div className="w-2/3 text-xs">
            <label htmlFor="lastname opacity-75">Last Name</label>
          </div>
          <input type="text" id="lastname" name="last name"  className="flex w-2/3 h-10 z-10 rounded mb-8 opacity-75" required></input>
          <div className="w-2/3 text-xs">
            <label htmlFor="email" opacity-75>Email</label>
          </div>
          <input type="text" id="email" name="email" className="flex w-2/3 h-10 z-10 rounded mb-10 opacity-75" required></input>
          <button className="w-2/3 bg-spotify-green h-14 z-10 rounded text-center">Next</button>
        </form>
      </div>
    </div>
  )
}

export default CreateProfile
