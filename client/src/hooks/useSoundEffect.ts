import { useCallback } from 'react';
import { getSoundInstance } from '@/lib/sounds';

export type SoundEffectType = 'click' | 'open' | 'close' | 'minimize' | 'maximize' | 'error' | 'success' | 'notification' | 'startup' | 'shutdown';

export interface UseSoundEffectReturn {
  playSound: (soundType: SoundEffectType) => void;
  setVolume: (volume: number) => void;
  getVolume: () => number;
}

/**
 * Hook for playing sound effects throughout the application
 * Provides a simple interface to trigger various Windows XP sounds
 */
export const useSoundEffect = () => {
  const setVolume = useCallback((volume: number) => {
    const sounds = getSoundInstance();
    sounds.setVolume(volume / 100); // Convert 0-100 to 0-1
  }, []);

  const getVolume = useCallback(() => {
    const sounds = getSoundInstance();
    return sounds.getVolume() * 100; // Convert 0-1 to 0-100
  }, []);

  const playSound = useCallback((soundType: SoundEffectType) => {
    const sounds = getSoundInstance();
    
    switch (soundType) {
      case 'click':
        sounds.playClick();
        break;
      case 'open':
        // Window open - slightly higher pitched click
        sounds.playClick();
        break;
      case 'close':
        // Window close - lower pitched click
        sounds.playError();
        break;
      case 'minimize':
        sounds.playClick();
        break;
      case 'maximize':
        sounds.playClick();
        break;
      case 'error':
        sounds.playError();
        break;
      case 'success':
        sounds.playSuccess();
        break;
      case 'notification':
        sounds.playNotification();
        break;
      case 'startup':
        sounds.playStartup();
        break;
      case 'shutdown':
        sounds.playShutdown();
        break;
      default:
        sounds.playClick();
    }
  }, []);

  return { playSound, setVolume, getVolume };
};
