import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import SpotifyWebApi from 'spotify-web-api-node'
import { playingTrackState } from '../atoms/playerAtom'
import Body from './Body'
import Player from './Player'
import Right from './Right'
import Sidebar from './Sidebar'

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
})


function Dashboard() {
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState)
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const [showPlayer, setShowPlayer] = useState(false)

  const chooseTrack = (track) =>{
    setPlayingTrack(track)
  }

  useEffect(()=>{
    setShowPlayer(true)
  }, [])

  return (
    <main className='flex min-h-screen min-w-max bg-black lg:pb-24'>
        <Sidebar/>
        <Body spotifyApi={spotifyApi} chooseTrack={chooseTrack}/>
        <Right spotifyApi={spotifyApi} chooseTrack={chooseTrack}/>

        <div className='fixed bottom-0 left-0 right-0 z-50'>
          <Player accessToken={accessToken} trackUri={playingTrack.uri}/>
        </div>
    </main>
  )
}

export default Dashboard