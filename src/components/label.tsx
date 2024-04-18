'use client'

import React, { useState } from 'react';
import AudioPlayer from '@components/audioPlayer';
import { ReleaseInfo } from '@components/releaseInfo';

export interface LabelProps {
 releases: ReleaseInfo[];
 showAllLink: string;
}

export const releases : ReleaseInfo[] = [
    {id: "Roots-001", title: "Save the Child in You", artist: "Z.Zee", imageUrl:"/Roots-001.jpg", soundCloudUrl: "https://soundcloud.com/lovereactionfamily/zzee-save-the-child-in-you?in=lovereactionfamily/sets/z-zee-save-the-child-in-you"},
    {id: "LR-001", title: "Disco Lore", artist: "Mirlaqi", imageUrl:"/LR-001.jpg", soundCloudUrl: "https://soundcloud.com/lovereactionfamily/mirlaqi-disco-lore-snippets?in=lovereactionfamily/sets/mirlaqi-disco-lore"},
];


const Label = ({ releases, showAllLink }: LabelProps) => {
 const [currentTrack, setCurrentTrack] = useState<ReleaseInfo | null>(null);

 const playTrack = (track: ReleaseInfo) => {
    setCurrentTrack(track);
 };

 return (
    <div className="flex flex-wrap justify-center items-center">
      {releases.map((release) => (
        <div key={release.id} className="m-2">
          <div className="relative">
            <img src={release.imageUrl} alt={release.title} className="w-full h-64 object-cover" />
            <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 w-full h-full flex items-center justify-center">
              <button onClick={() => playTrack(release)} className="text-white">Play</button>
            </div>
          </div>
          <div className="text-center">
            <p className="text-white">{release.title}</p>
            <p className="text-white">{release.artist}</p>
          </div>
        </div>
      ))}
      {releases.length > 5 && (
        <div className="text-center">
          <a href={showAllLink} className="text-blue-500 hover:text-blue-700">Show All</a>
        </div>
      )}
      {currentTrack && (
        <AudioPlayer
            id={currentTrack.id}
            title={currentTrack.title}
            artist={currentTrack.artist}
            imageUrl={currentTrack.imageUrl}
            soundCloudUrl={currentTrack.soundCloudUrl}
        />
      )}
    </div>
 );
};

export default Label;
