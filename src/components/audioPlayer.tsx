'use client'

import { TrackInfo } from '@components/audio';
import { ChangeEvent, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { usePlayer } from './playerProvider';

export interface PlayerState {
  url?: string | null
  playing?: boolean
  loop?: boolean
  seeking?: boolean
  volume?: number
  muted?: boolean
  playbackRate?: number
  pip?: boolean
  played: Number,
  loaded: Number,
  duration: Number,
}

const AudioPlayer = ({ trackInfo }: { trackInfo: TrackInfo}) => {
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

  const [currentState, setState] = useState<PlayerState>(initialPlayerState);

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
    setState({...currentState, playing: !currentState.playing })
  }

  const handleStop = () => {
    setState({...currentState, url: null, playing: false })
  }

  const handleToggleLoop = () => {
    setState({...currentState, loop: !currentState.loop })
  }

  const handleVolumeChange = (e : ChangeEvent<HTMLInputElement>) => {
    setState({...currentState, volume: parseFloat(e.target.value) })
  }

  const handleToggleMuted = () => {
    setState({...currentState, muted: !currentState.muted })
  }

  const handleSetPlaybackRate = (e : ChangeEvent<HTMLInputElement>) => {
    setState({...currentState, playbackRate: parseFloat(e.target.value) })
  }

  const handleTogglePIP = () => {
    setState({...currentState, pip: !currentState.pip })
  }

  const handlePlay = () => {
    console.log('onPlay')
    setState({...currentState, playing: true })
  }

  const handleEnablePIP = () => {
    console.log('onEnablePIP')
    setState({...currentState, pip: true })
  }

  const handleDisablePIP = () => {
    console.log('onDisablePIP')
    setState({...currentState, pip: false })
  }

  const handlePause = () => {
    console.log('onPause')
    setState({...currentState, playing: false })
  }

  const handleSeekMouseDown = (__ : React.MouseEvent<HTMLInputElement>) => {
    setState({...currentState, seeking: true })
  }

  const handleSeekChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setState({...currentState, played: parseFloat(e.target.value) })
  }

  const handleSeekMouseUp = (e : React.MouseEvent<HTMLInputElement>) => {
    setState({...currentState, seeking: false })
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
    setState({...currentState, playing: currentState.loop })
  }

  const handleDuration = (duration: Number) => {
    console.log('onDuration', duration)
    setState({...currentState, duration })
  }

  const renderLoadButton = (url : string, label : string) => {
    return (
      <button onClick={() => load(url)}>
        {label}
      </button>
    )
  }

  const player = useRef<ReactPlayer | null>(null);

  const { playlist: currentPlaylist, trackIndex: currentTrackIndex, incrementTrackIndex } = usePlayer();

  return (
    <div>
      <ReactPlayer
        // className="hidden"
        ref={player}
        url={trackInfo.url}
        onEnded={incrementTrackIndex}
      />
    </div>
 );
};


export default AudioPlayer;
