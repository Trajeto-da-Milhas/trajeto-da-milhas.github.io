import { useEffect, useRef } from 'react';
import { trackVideoPlay, trackVideoCompleted, trackCTAClick } from '../services/videoAnalytics';

export const useVideoTracking = (videoUrl: string) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      if (!hasPlayedRef.current) {
        trackVideoPlay(videoUrl);
        hasPlayedRef.current = true;
      }
    };

    const handleEnded = () => {
      if (video.duration > 0) {
        trackVideoCompleted(videoUrl, video.currentTime, video.duration);
      }
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('ended', handleEnded);
    };
  }, [videoUrl]);

  const trackCTA = () => {
    trackCTAClick(videoUrl);
  };

  return { videoRef, trackCTA };
};
