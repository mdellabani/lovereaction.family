import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { TrackInfo } from './audio';

interface PlayerContextProps {
	playlist: TrackInfo[];
	trackIndex: number;
	updatePlaylist: (playlist: TrackInfo[]) => void;
  incrementTrackIndex: () => void;
}

const PlayerContext = createContext<PlayerContextProps | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [playlist, setPlaylist] = useState<TrackInfo[]>([]);
  const [trackIndex, setTrackIndex] = useState(0);

  const updatePlaylist = (playlist: TrackInfo[]) => {
		setPlaylist(playlist);
		setTrackIndex(0); // reset to first track of the new playlist
	};

  const incrementTrackIndex = () => {
    setTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

	return (
		<PlayerContext.Provider value={{ playlist, trackIndex, updatePlaylist, incrementTrackIndex }}>
			{children}
		</PlayerContext.Provider>
	);
};
  
export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
	throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};