'use client'

import React, { useEffect, useState } from 'react';
import AudioPlayer from '@components/audioPlayer';
import { TrackInfo, Universe } from '@components/audio';
import { usePlayer } from './playerProvider';


export const releases : TrackInfo[] = [
    {id: "Roots-001", type: Universe.ROOTS, title: "Save the Child in You", artist: "Z.Zee", imageUrl:"/Roots-001.jpg", url: "https://soundcloud.com/lovereactionfamily/sets/z-zee-save-the-child-in-you"},
    {id: "LR-001", type: Universe.LR, title: "Disco Lore", artist: "Mirlaqi", imageUrl:"/LR-001.jpg", url: "https://soundcloud.com/lovereactionfamily/sets/mirlaqi-disco-lore"},
];


const Label = ({ showAllLink }: {showAllLink : string}) => {

  const { playlist, trackIndex, showPlayer, incrementTrackIndex, setShowPlayer, setTrackIndex, updatePlaylist } = usePlayer();

  const playRelease = (index : number) => {
    setShowPlayer(true);
    setTrackIndex(index);
  }

  return (
    <div className="flex flex-nowrap justify-center items-center">
      {releases.map((release ,index) => (
        <div key={release.id} className="m-2">
          <div className="relative">
            <img src={release.imageUrl} alt={release.title} className="w-full h-64 object-cover" />
            <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 w-full h-full flex items-center justify-center">
              <button onClick={() => playRelease(index)} className="text-white">Play</button>
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
    </div>
 );
};

export default Label;
