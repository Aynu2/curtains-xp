import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';

interface Photo {
  id: string;
  title: string;
  emoji: string;
  date: string;
}

export const PhotoGallery: React.FC = () => {
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState(0);
  const [photos, setPhotos] = useState<Photo[]>([
    { id: '1', title: 'Beach Sunset', emoji: '🏖️', date: '2024-01-15' },
    { id: '2', title: 'Mountain Peak', emoji: '⛰️', date: '2024-01-14' },
    { id: '3', title: 'Forest Walk', emoji: '🌲', date: '2024-01-13' },
    { id: '4', title: 'City Lights', emoji: '🌃', date: '2024-01-12' },
    { id: '5', title: 'Starry Night', emoji: '🌌', date: '2024-01-11' },
    { id: '6', title: 'Ocean Waves', emoji: '🌊', date: '2024-01-10' },
  ]);

  const handleDelete = () => {
    setPhotos(photos.filter((_, idx) => idx !== selectedPhotoIdx));
    if (selectedPhotoIdx >= photos.length - 1) {
      setSelectedPhotoIdx(Math.max(0, photos.length - 2));
    }
  };

  const handleNext = () => {
    setSelectedPhotoIdx((prev) => (prev + 1) % photos.length);
  };

  const handlePrevious = () => {
    setSelectedPhotoIdx((prev) => (prev - 1 + photos.length) % photos.length);
  };

  if (photos.length === 0) {
    return (
      <div className="flex flex-col h-full [background-color:#DFDFDF] items-center justify-center">
        <div className="text-6xl mb-4">📷</div>
        <div className="text-center">
          <h2 className="font-bold mb-2">No Photos</h2>
          <p className="text-xs text-gray-600">Your photo gallery is empty</p>
        </div>
      </div>
    );
  }

  const currentPhoto = photos[selectedPhotoIdx];

  return (
    <div className="flex flex-col h-full [background-color:#DFDFDF]">
      {/* Viewer */}
      <div className="flex-1 bg-black flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-8xl mb-4">{currentPhoto.emoji}</div>
          <div className="text-white">
            <h2 className="font-bold text-lg">{currentPhoto.title}</h2>
            <p className="text-xs text-gray-400">{currentPhoto.date}</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-[background-color:#C0C0C0] border-t-2 border-gray-400 p-3 space-y-2">
        <div className="flex justify-center gap-2">
          <button
            onClick={handlePrevious}
            className="xp-button p-2"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="text-xs font-bold flex items-center px-2">
            {selectedPhotoIdx + 1} / {photos.length}
          </div>
          <button
            onClick={handleNext}
            className="xp-button p-2"
          >
            <ChevronRight size={16} />
          </button>
          <button
            onClick={handleDelete}
            className="xp-button p-2 ml-auto"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="bg-gray-800 p-2 overflow-x-auto flex gap-2">
        {photos.map((photo, idx) => (
          <button
            key={photo.id}
            onClick={() => setSelectedPhotoIdx(idx)}
            className={`flex-shrink-0 w-16 h-16 rounded border-2 flex items-center justify-center text-3xl transition-all ${
              idx === selectedPhotoIdx
                ? 'border-yellow-400 bg-gray-700'
                : 'border-gray-600 bg-gray-800 hover:border-gray-500'
            }`}
          >
            {photo.emoji}
          </button>
        ))}
      </div>
    </div>
  );
};
