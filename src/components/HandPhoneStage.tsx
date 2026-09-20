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

  const { startPosition, endPosition, startRotation, endRotation, startScale, endScale } = ANIMATION_CONFIG.arc;
  const initialTransform = `translate3d(${startPosition.x}px, ${startPosition.y}px, ${startPosition.z}px) rotateX(${startRotation.rx}deg) rotateY(${startRotation.ry}deg) rotateZ(${startRotation.rz}deg) scale(${startScale})`;
  const finalTransform = `translate3d(${endPosition.x}px, ${endPosition.y}px, ${endPosition.z}px) rotateX(${endRotation.rx}deg) rotateY(${endRotation.ry}deg) rotateZ(${endRotation.rz}deg) scale(${endScale})`;

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
      el.style.transform = finalTransform;
      updateState('SETTLED');

      // Check if user scrolled back up while animation was playing
      const scrollY = window.scrollY || document.documentElement.scrollTop || window.pageYOffset || 0;
      if (scrollY <= 30) {
        playExit();
      }
    };
  }, [updateState, finalTransform]);

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
      el.style.transform = initialTransform;
      updateState('OFFSCREEN');

      // Check if user scrolled back down while exit was playing
      const scrollY = window.scrollY || document.documentElement.scrollTop || window.pageYOffset || 0;
      if (scrollY > 30) {
        playEntrance();
      }
    };
  }, [updateState, playEntrance, initialTransform]);

  // Scroll and wheel listener
  useEffect(() => {
    const checkScrollState = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || window.pageYOffset || 0;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const fraction = scrollY / maxScroll;
      const isOverThreshold = scrollY > 40 || fraction >= SCROLL_CONFIG.threshold;

      if (!isAnimatingRef.current) {
        if (isOverThreshold && stageStateRef.current === 'OFFSCREEN') {
          playEntrance();
        } else if (!isOverThreshold && stageStateRef.current === 'SETTLED') {
          playExit();
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (!isAnimatingRef.current) {
        if (e.deltaY > 25 && stageStateRef.current === 'OFFSCREEN') {
          playEntrance();
        } else if (e.deltaY < -25 && stageStateRef.current === 'SETTLED' && (window.scrollY || 0) <= 40) {
          playExit();
        }
      }
    };

    window.addEventListener('scroll', checkScrollState, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });

    // Check on initial load
    checkScrollState();

    return () => {
      window.removeEventListener('scroll', checkScrollState);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [playEntrance, playExit]);

  return (
    <>
      {/* Tall Scroll Spacer that enables 200vh page scrolling */}
      <div
        className="scroll-spacer"
        style={{
          width: '100%',
          height: `${SCROLL_CONFIG.containerHeightVh}vh`,
          pointerEvents: 'none',
          visibility: 'hidden',
        }}
        aria-hidden="true"
      />

      {/* Fixed Full-Viewport 3D Stage (always centered in viewport) */}
      <div
        className="fixed-viewport-stage"
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: '1400px',
          perspectiveOrigin: '50% 50%',
          pointerEvents: 'none',
          zIndex: 5,
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
    </>
  );
};
