import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SCROLL_CONFIG, ANIMATION_CONFIG } from '../config';
import {
  generateArcEntranceKeyframes,
  generateArcExitKeyframes,
  REDUCED_MOTION_ENTRANCE_KEYFRAMES,
  REDUCED_MOTION_EXIT_KEYFRAMES,
} from '../utils/arcKeyframes';
import { HandPhone } from './HandPhone';
import { ScrollCue } from './ScrollCue';

interface HandPhoneStageProps {
  onSettledChange?: (isSettled: boolean) => void;
  isDebug?: boolean;
}

type StageState = 'OFFSCREEN' | 'ENTERING' | 'SETTLED' | 'EXITING';

export const HandPhoneStage: React.FC<HandPhoneStageProps> = ({
  onSettledChange,
  isDebug = false,
}) => {
  const [stageState, setStageState] = useState<StageState>('OFFSCREEN');
  const stageStateRef = useRef<StageState>('OFFSCREEN');
  const isAnimatingRef = useRef<boolean>(false);
  const phoneWrapperRef = useRef<HTMLDivElement | null>(null);
  const activeAnimationRef = useRef<Animation | null>(null);

  // Keep ref in sync with state
  stageStateRef.current = stageState;

  const updateState = useCallback(
    (newState: StageState) => {
      setStageState(newState);
      stageStateRef.current = newState;
      if (onSettledChange) {
        onSettledChange(newState === 'SETTLED');
      }
    },
    [onSettledChange]
  );

  // Trigger entrance animation
  const playEntrance = useCallback(() => {
    const el = phoneWrapperRef.current;
    if (!el || isAnimatingRef.current) return;

    isAnimatingRef.current = true;
    updateState('ENTERING');

    const isRM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const keyframes = isRM ? REDUCED_MOTION_ENTRANCE_KEYFRAMES : generateArcEntranceKeyframes();
    const duration = isRM ? 400 : ANIMATION_CONFIG.durationEntranceMs;
    const easing = isRM ? 'ease' : ANIMATION_CONFIG.easingEntrance;

    if (activeAnimationRef.current) {
      activeAnimationRef.current.cancel();
    }

    const anim = el.animate(keyframes as unknown as Keyframe[], {
      duration,
      easing,
      fill: 'forwards',
    });
    activeAnimationRef.current = anim;

    anim.onfinish = () => {
      isAnimatingRef.current = false;
      updateState('SETTLED');

      // Check if user scrolled back up while animation was playing
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentFraction = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      if (currentFraction < SCROLL_CONFIG.threshold) {
        playExit();
      }
    };
  }, [updateState]);

  // Trigger exit animation
  const playExit = useCallback(() => {
    const el = phoneWrapperRef.current;
    if (!el || isAnimatingRef.current) return;

    isAnimatingRef.current = true;
    updateState('EXITING');

    const isRM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const keyframes = isRM ? REDUCED_MOTION_EXIT_KEYFRAMES : generateArcExitKeyframes();
    const duration = isRM ? 350 : ANIMATION_CONFIG.durationExitMs;
    const easing = isRM ? 'ease' : ANIMATION_CONFIG.easingExit;

    if (activeAnimationRef.current) {
      activeAnimationRef.current.cancel();
    }

    const anim = el.animate(keyframes as unknown as Keyframe[], {
      duration,
      easing,
      fill: 'forwards',
    });
    activeAnimationRef.current = anim;

    anim.onfinish = () => {
      isAnimatingRef.current = false;
      updateState('OFFSCREEN');

      // Check if user scrolled back down while exit was playing
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentFraction = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      if (currentFraction >= SCROLL_CONFIG.threshold) {
        playEntrance();
      }
    };
  }, [updateState, playEntrance]);

  // Scroll handler with trigger threshold and lock
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const fraction = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      const isOverThreshold = fraction >= SCROLL_CONFIG.threshold;

      if (!isAnimatingRef.current) {
        if (isOverThreshold && stageStateRef.current === 'OFFSCREEN') {
          playEntrance();
        } else if (!isOverThreshold && stageStateRef.current === 'SETTLED') {
          playExit();
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial scroll on mount
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [playEntrance, playExit]);

  // Initial offscreen transform
  const { startPosition, startRotation, startScale } = ANIMATION_CONFIG.arc;
  const initialTransform = `translate3d(${startPosition.x}px, ${startPosition.y}px, ${startPosition.z}px) rotateX(${startRotation.rx}deg) rotateY(${startRotation.ry}deg) rotateZ(${startRotation.rz}deg) scale(${startScale})`;

  return (
    <div
      className="scroll-container"
      style={{
        position: 'relative',
        width: '100%',
        height: `${SCROLL_CONFIG.containerHeightVh}vh`,
        pointerEvents: 'none', // Crucial: allow ctOS canvas full interaction
        zIndex: 5,
      }}
    >
      {/* Sticky Full-Viewport Stage */}
      <div
        className="sticky-stage"
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: '1200px',
          perspectiveOrigin: '50% 50%',
          pointerEvents: 'none',
        }}
      >
        {/* Animated Hand + Phone 3D Wrapper */}
        <div
          ref={phoneWrapperRef}
          className="phone-3d-wrapper"
          style={{
            transform: initialTransform,
            transformStyle: 'preserve-3d',
            willChange: 'transform, filter',
            pointerEvents: isDebug ? 'auto' : 'none',
          }}
        >
          <HandPhone isDebug={isDebug} />
        </div>

        {/* Scroll Cue (fades out as soon as entering starts) */}
        <ScrollCue visible={stageState === 'OFFSCREEN'} />
      </div>
    </div>
  );
};
