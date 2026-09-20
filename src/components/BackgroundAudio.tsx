import React, { useState, useEffect, useRef } from 'react';
import './BackgroundAudio.css';

interface BackgroundAudioProps {
  isBooted: boolean;
  isDimmed?: boolean;
  defaultVolume?: number;
}

export const BackgroundAudio: React.FC<BackgroundAudioProps> = ({
  isBooted,
  isDimmed = false,
  defaultVolume = 0.08,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [waitingForInteraction, setWaitingForInteraction] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize and start audio playback when visitor enters main page (isBooted = true)
  useEffect(() => {
    if (!isBooted) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
      return;
    }

    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = defaultVolume;
    audio.loop = true;

    const startPlayback = () => {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setWaitingForInteraction(false);
          })
          .catch((err) => {
            // Autoplay policy prevented immediate playback; wait for first user gesture
            console.log('Audio autoplay awaiting user interaction:', err.message);
            setWaitingForInteraction(true);

            const handleFirstGesture = () => {
              if (audioRef.current) {
                audioRef.current.volume = defaultVolume;
                audioRef.current
                  .play()
                  .then(() => {
                    setIsPlaying(true);
                    setWaitingForInteraction(false);
                  })
                  .catch(() => {});
              }
              window.removeEventListener('pointerdown', handleFirstGesture);
              window.removeEventListener('keydown', handleFirstGesture);
              window.removeEventListener('click', handleFirstGesture);
              window.removeEventListener('touchstart', handleFirstGesture);
            };

            window.addEventListener('pointerdown', handleFirstGesture, { once: true });
            window.addEventListener('keydown', handleFirstGesture, { once: true });
            window.addEventListener('click', handleFirstGesture, { once: true });
            window.addEventListener('touchstart', handleFirstGesture, { once: true });
          });
      }
    };

    startPlayback();

    return () => {
      audio.pause();
    };
  }, [isBooted, defaultVolume]);

  // Sync mute state with audio element volume
  useEffect(() => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.muted = true;
    } else {
      audioRef.current.muted = false;
      audioRef.current.volume = defaultVolume;
      if (isBooted && audioRef.current.paused) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  }, [isMuted, isBooted, defaultVolume]);

  // Keyboard shortcut 'M' to toggle mute
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input, textarea, or contentEditable element
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      if ((e.key === 'm' || e.key === 'M') && isBooted) {
        setIsMuted((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isBooted]);

  const toggleMute = () => {
    if (waitingForInteraction && audioRef.current) {
      // Direct click resolves gesture requirement
      audioRef.current.volume = defaultVolume;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setWaitingForInteraction(false);
          setIsMuted(false);
        })
        .catch(() => {});
      return;
    }

    setIsMuted((prev) => !prev);
  };

  if (!isBooted) {
    return null;
  }

  const volPercent = Math.round(defaultVolume * 100);

  return (
    <>
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}bg.mp3`}
        loop
        preload="auto"
      />

      <div
        className={`bg-audio-hud ${isDimmed ? 'dimmed' : ''} ${isMuted ? 'muted' : ''} ${
          waitingForInteraction ? 'waiting' : ''
        }`}
        onClick={toggleMute}
        title={
          isMuted
            ? 'ctOS Background Sound: Muted (Click or press M to Unmute)'
            : waitingForInteraction
            ? 'Click to start ctOS Background Sound'
            : 'ctOS Background Sound: Playing (Click or press M to Mute)'
        }
        role="button"
        tabIndex={0}
        aria-label="ctOS Background Audio"
      >
        <div className={`audio-bars ${isPlaying && !isMuted ? 'playing' : 'muted'}`}>
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </div>

        <div className="audio-label">
          {waitingForInteraction ? (
            <>
              <span className="audio-tag">[BGM: TAP TO PLAY]</span>
            </>
          ) : isMuted ? (
            <>
              <span className="audio-tag">[BGM: MUTED]</span>
            </>
          ) : (
            <>
              <span className="audio-tag">[BGM // ACTIVE]</span>
              <span className="audio-vol">{volPercent}%</span>
            </>
          )}
        </div>
      </div>
    </>
  );
};
