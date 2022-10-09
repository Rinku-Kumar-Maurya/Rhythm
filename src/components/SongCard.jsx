import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import PlayPause from './PlayPause'
import { playPause, setActiveSong } from '../redux/features/playerSlice'

const SongCard = ({song, i, isPlaying, activeSong, data}) => {
  const dispatch = useDispatch()

  const handlePauseClick = () => {
    dispatch(playPause(false))
  }

  const handlePlayClick = () => {
    dispatch(setActiveSong({song, data, i}))
    dispatch(playPause(true))
  }

  return (
    <div className='flex flex-col p-4 bg-white/5 bg-opacity-80 w-[250px] 
    backdrop-blur-sm animate-slideup rounded-lg cursor-pointer'>
      <div className='relative h-56 w-full group'>
        <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50
        group-hover:flex ${activeSong?.title === song.title ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
          <PlayPause 
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img alt='song_image' src={song?.images?.coverart} />
      </div>
      <div className='mt-4 flex flex-col'>
        <p className='font-semibold text-lg text-white truncate'>
          <Link to={`/song/${song.key}`}>
            {song.title}
          </Link>
        </p>
        <p className='text-sm text-gray-300 mt-1 truncate'>
          <Link to={song.artists ? `/artists/${song?.artists[0]?.adamid}` : '/top-artists'}>
            {song.subtitle}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SongCard