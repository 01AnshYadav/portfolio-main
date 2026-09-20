import React, { useState, useEffect, useRef } from 'react';
import { SCROLL_CONFIG, ANIMATION_CONFIG } from '../config';
import { getArcTransform } from '../utils/arcKeyframes';
import { HandPhone } from './HandPhone';
import { ScrollCue } from './ScrollCue';
import type { AppId } from './phone/DedSecPhoneOS';

interface HandPhoneStageProps {
  onSettledChange?: (isSettled: boolean) => void;
  isDebug?: boolean;
  onOpenApp?: (appId: AppId) => void;
}

export const HandPhoneStage: React.FC<HandPhoneStageProps> = ({
  onSettledChange,
  isDebug = false,
  onOpenApp,
}) => {
  const [isCueVisible, setIsCueVisible] = useState<boolean>(true);
  const [isSettled, setIsSettled] = useState<boolean>(false);
  const phoneWrapperRef = useRef<HTMLDivElement | null>(null);
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const isSettledRef = useRef<boolean>(false);
  const animFrameIdRef = useRef<number>(0);

  const { startPosition, startRotation, startScale } = ANIMATION_CONFIG.arc;
  const initialTransform = `translate3d(${startPosition.x}px, ${startPosition.y}px, ${startPosition.z}px) rotateX(${startRotation.rx}deg) rotateY(${startRotation.ry}deg) rotateZ(${startRotation.rz}deg) scale(${startScale})`;

  // Continuous smooth scroll loop
  useEffect(() => {
    const isRM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const entranceDist = SCROLL_CONFIG.entranceDistancePx || 300;
    const lerp = SCROLL_CONFIG.lerpFactor || 0.16;
    let lastTime = performance.now();

    const updateTargetFromScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || window.pageYOffset || 0;
      // Target progress from 0 (at top) to 1 (at entranceDist px down)
      const target = Math.min(1, Math.max(0, scrollY / entranceDist));
      targetProgressRef.current = target;
      setIsCueVisible(target < 0.12);
    };

    window.addEventListener('scroll', updateTargetFromScroll, { passive: true });
    updateTargetFromScroll();

    const loop = (now: number) => {
      const dt = Math.min(50, now - lastTime);
      lastTime = now;

      const target = targetProgressRef.current;
      const current = currentProgressRef.current;

      // Smooth damped lerp toward target
      const factor = isRM ? 1 : 1 - Math.pow(1 - lerp, dt / 16.667);
      const next = current + (target - current) * factor;
      currentProgressRef.current = next;

      // Update phone transform along the quarter-circle arc
      if (phoneWrapperRef.current) {
        if (isRM) {
          phoneWrapperRef.current.style.transform = `translate3d(0px, 35px, 0px) scale(1)`;
          phoneWrapperRef.current.style.opacity = `${next.toFixed(3)}`;
        } else {
          phoneWrapperRef.current.style.transform = getArcTransform(next);
          phoneWrapperRef.current.style.opacity = '1';
        }
      }

      // Settled state for dimming ctOS HUD and Target panel & activating phone interactivity
      const settled = next >= 0.88;
      if (settled !== isSettledRef.current) {
        isSettledRef.current = settled;
        setIsSettled(settled);
        if (onSettledChange) onSettledChange(settled);
      }

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('scroll', updateTargetFromScroll);
      cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [onSettledChange]);

  return (
    <>
      {/* 200vh Scroll Spacer that gives natural, effortless scroll tracking */}
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

      {/* Fixed Full-Viewport 3D Stage (always centered, perfectly responsive) */}
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
            willChange: 'transform',
            pointerEvents: isSettled || isDebug ? 'auto' : 'none',
          }}
        >
          <HandPhone isDebug={isDebug} isSettled={isSettled} onOpenApp={onOpenApp} />
        </div>

        {/* Scroll Cue (smoothly fades out as scroll starts) */}
        <ScrollCue visible={isCueVisible} />
      </div>
    </>
  );
};
