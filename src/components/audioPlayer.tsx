'use client'

import { ReleaseInfo } from '@components/releaseInfo';
import React, { useEffect, useRef, useState } from 'react';

const AudioPlayer = ( trackUrl : string) => {
 useSoundCloudWidget();
 const [isPlaying, setIsPlaying] = useState(false);
 const iframeRef = useRef<HTMLIFrameElement>(null);

 useEffect(() => {
    if (window.SC && iframeRef.current) {
      const widget = window.SC.Widget(iframeRef.current);

      widget.bind(window.SC.Widget.Events.PLAY, () => {
        setIsPlaying(true);
      });

      widget.bind(window.SC.Widget.Events.PAUSE, () => {
        widget.isPaused((isPaused) => {
          if (isPaused) setIsPlaying(false);
        });
      });

      widget.load(trackUrl, {
        auto_play: false,
        show_artwork: true,
        show_comments: false,
        show_playcount: false,
        show_user: false,
      });
    }
 }, [trackUrl]);

 return (
    <div>
      <iframe
        ref={iframeRef}
        width="100%"
        height="166"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(trackUrl)}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}
      ></iframe>
      <button onClick={() => iframeRef.current?.contentWindow?.postMessage('{"method":"play"}', '*')}>
        {isPlaying ? '⏸️' : '▶️'}
      </button>
    </div>
 );
};

const useSoundCloudWidget = () => {
 useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://w.soundcloud.com/player/api.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
 }, []);
};

export default AudioPlayer;
