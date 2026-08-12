import React, { useState, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

interface Playlist {
  id: string;
  title: string;
  artist: string;
  duration: string;
}

export const MediaPlayer: React.FC = () => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [currentTime, setCurrentTime] = useState(0);

  const playlist: Playlist[] = [
    { id: '1', title: 'Retro Vibes', artist: 'Synthwave Dreams', duration: '3:45' },
    { id: '2', title: 'Digital Sunset', artist: 'Neon Nights', duration: '4:12' },
    { id: '3', title: 'Pixel Paradise', artist: ' 8-Bit Orchestra', duration: '3:28' },
    { id: '4', title: 'Nostalgic Memories', artist: 'Classic Beats', duration: '3:56' },
    { id: '5', title: 'Windows XP Vibes', artist: 'System Sounds', duration: '2:15' },
  ];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
  };

  const handlePrevious = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  return (
    <div className="flex flex-col h-full [background-color:#DFDFDF]">
      {/* Now Playing */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4">
        <h2 className="font-bold text-sm mb-4">Now Playing</h2>
        <div className="text-center mb-4">
          <div className="text-4xl mb-2">🎵</div>
          <div className="font-bold">{playlist[currentTrack].title}</div>
          <div className="text-xs text-blue-100">{playlist[currentTrack].artist}</div>
        </div>

        {/* Progress Bar */}
        <div className="mb-2">
          <input
            type="range"
            min="0"
            max="100"
            value={currentTime}
            onChange={(e) => setCurrentTime(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs mt-1">
            <span>0:{String(currentTime).padStart(2, '0')}</span>
            <span>{playlist[currentTrack].duration}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-2 mb-4">
          <button
            onClick={handlePrevious}
            className="xp-button p-2 text-white"
          >
            <SkipBack size={16} />
          </button>
          <button
            onClick={handlePlayPause}
            className="xp-button p-2 text-white"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button
            onClick={handleNext}
            className="xp-button p-2 text-white"
          >
            <SkipForward size={16} />
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2">
          <Volume2 size={14} />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="flex-1"
          />
          <span className="text-xs">{volume}%</span>
        </div>
      </div>

      {/* Playlist */}
      <div className="flex-1 overflow-auto p-2">
        <h3 className="font-bold text-xs mb-2 px-2">Playlist</h3>
        <div className="space-y-1">
          {playlist.map((track, idx) => (
            <button
              key={track.id}
              onClick={() => {
                setCurrentTrack(idx);
                setIsPlaying(true);
              }}
              className={`w-full p-2 text-left text-xs rounded transition-colors ${
                idx === currentTrack
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-200'
              }`}
            >
              <div className="font-bold">{track.title}</div>
              <div className="text-gray-600">{track.artist}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
