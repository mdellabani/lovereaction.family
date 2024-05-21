'use client'

import { TrackInfo } from '@components/trackInfo';
import ReactPlayer from 'react-player';

const AudioPlayer = ({ trackInfo }: { trackInfo: TrackInfo}) => {

  return (
    <div>
      <ReactPlayer
        // className="hidden"
        url={trackInfo.url}
      />
    </div>
 );
};


export default AudioPlayer;
