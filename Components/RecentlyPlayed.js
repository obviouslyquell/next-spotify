import React from 'react'
import { useRecoilState } from "recoil";
import { playingTrackState, playState } from "../atoms/playerAtom";

function RecentlyPlayed({track, chooseTrack}) {
  const [play, setPlay] = useRecoilState(playState);
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
  const handlePlay = () => {
    chooseTrack(track);

    if (track.uri === playingTrack.uri) {
      setPlay(!play);
    }
  };
  return (
    <div className='flex items-center space-x-3' onClick={handlePlay}>
        <img src={track.albumUrl} alt="" className='rounded-full w-[52px] h-[52px]'/>
        <div>
          <h4 className='text-white text-sm font-semibold truncate w-[450px]'>{track.title}</h4>
          <p className='text-[rgb(179,179,179)] text-[13px] font-semibold group-hover:text-white'>{track.artist}</p>
        </div>
    </div>
  )
}

export default RecentlyPlayed