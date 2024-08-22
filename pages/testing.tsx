import type { NextPage } from 'next'
import { useEffect } from 'react'
import Head from 'next/head'
import axios from 'axios'

const Testing: NextPage = () => {

  return (
    <div className="h-screen w-screen">
        <iframe style={{borderRadius: "12px"}} src="https://open.spotify.com/embed/track/4OqUFJkoUZA7RNtEyvilS1?utm_source=generator" width="100%" height="150" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    </div>
  )
}

export default Testing
