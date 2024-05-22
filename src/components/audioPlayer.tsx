'use client'

import { TrackInfo } from '@components/audio';
import { ChangeEvent, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { usePlayer } from './playerProvider';
import { Duration } from './duration';

export interface PlayerState {
  url?: string | null
  playing?: boolean
  loop?: boolean
  seeking?: boolean
  volume?: number
  muted?: boolean
  playbackRate?: number
  pip?: boolean
  played: number,
  loaded: number,
  duration: number,
}

const AudioPlayer = () => {
  const initialPlayerState : PlayerState = {
    pip: false,
    playing: true,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    loop: false
  };

  const [state, setState] = useState<PlayerState>(initialPlayerState);

  const load = (url : string) => {
    setState({
      url,
      duration: 0,
      played: 0,
      loaded: 0,
      pip: false
    })
  }

  const handlePlayPause = () => {
    setState({...state, playing: !state.playing })
  }

  const handleStop = () => {
    setState({...state, url: null, playing: false })
  }

  const handleToggleLoop = () => {
    setState({...state, loop: !state.loop })
  }

  const handleVolumeChange = (e : ChangeEvent<HTMLInputElement>) => {
    setState({...state, volume: parseFloat(e.target.value) })
  }

  const handleToggleMuted = () => {
    setState({...state, muted: !state.muted })
  }

  const handleSetPlaybackRate = (e : ChangeEvent<HTMLInputElement>) => {
    setState({...state, playbackRate: parseFloat(e.target.value) })
  }

  const handleTogglePIP = () => {
    setState({...state, pip: !state.pip })
  }

  const handlePlay = () => {
    console.log('onPlay')
    setState({...state, playing: true })
  }

  const handleEnablePIP = () => {
    console.log('onEnablePIP')
    setState({...state, pip: true })
  }

  const handleDisablePIP = () => {
    console.log('onDisablePIP')
    setState({...state, pip: false })
  }

  const handlePause = () => {
    console.log('onPause')
    setState({...state, playing: false })
  }

  const handleSeekMouseDown = (__ : React.MouseEvent<HTMLInputElement>) => {
    setState({...state, seeking: true })
  }

  const handleSeekChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setState({...state, played: parseFloat(e.target.value) })
  }

  const handleSeekMouseUp = (e : React.MouseEvent<HTMLInputElement>) => {
    setState({...state, seeking: false })
    const target = e.target as HTMLInputElement;
    player?.current?.seekTo(parseFloat(target.value))
  }

  const handleProgress = (state : PlayerState) => {
    console.log('onProgress', state)
    // We only want to update time slider if we are not currently seeking
    if (!state.seeking) {
      setState(state)
    }
  }

  const handleEnded = () => {
    console.log('onEnded')
    setState({...state, playing: state.loop })
  }

  const handleDuration = (duration: number) => {
    console.log('onDuration', duration)
    setState({...state, duration })
  }

  const renderLoadButton = (url : string, label : string) => {
    return (
      <button onClick={() => load(url)}>
        {label}
      </button>
    )
  }

  const player = useRef<ReactPlayer | null>(null);
  const { playlist, trackIndex, showPlayer, incrementTrackIndex, setShowPlayer, updatePlaylist } = usePlayer();
  const url : string = playlist[trackIndex].url!;
  return (
    <div>
      <ReactPlayer
        className="hidden"
        ref={player}
        url={url}
        // url={playlist.map(release => release.url) }
        onEnded={incrementTrackIndex}
        {...initialPlayerState}
      />
      {showPlayer &&
        <div className='flex flex-nowrap justify-center'>
          <div>
            <button onClick={handleStop}>Stop</button>
            <button onClick={handlePlayPause}>{state.playing ? 'Pause' : 'Play'}</button>
          </div>
          <div>
            Seeking
            <input
              type='range' min={0} max={0.999999} step='any'
              value={state.played}
              onMouseDown={handleSeekMouseDown}
              onChange={handleSeekChange}
              onMouseUp={handleSeekMouseUp}
            />
          </div>
          <div>
            Volume
            <input type='range' min={0} max={1} step='any' value={state.volume} onChange={handleVolumeChange} />
          </div>
          <div>
            Mute
            <input id='muted' type='checkbox' checked={state.muted} onChange={handleToggleMuted} />
          </div>
          <div>
            loop
            <input id='loop' type='checkbox' checked={state.loop} onChange={handleToggleLoop} />
          </div>
          <div>
            Played
            <progress max={1} value={state.played} />
          </div>
          <div>
            State
            <div>
              duration
              <Duration seconds={state.duration} />
            </div>
            <div>
              elapesed
              <Duration seconds={state.duration * state.played} />
            </div>
            <div>
              remaining
              <Duration seconds={state.duration * (1 - state.played)} />
            </div>
          </div>
        </div>}
    </div>
 );
};


export default AudioPlayer;
