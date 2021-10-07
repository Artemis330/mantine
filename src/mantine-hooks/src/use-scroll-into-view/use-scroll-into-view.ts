/* eslint-disable no-param-reassign */
import { useCallback, useRef, useEffect } from 'react';

import { easeInOutQuad } from './utils/ease-in-out-quad';
import { getRelativePosition } from './utils/get-relative-position';
import { getScrollStart } from './utils/get-scroll-start';
import { setScrollParam } from './utils/set-scroll-param';

interface ScrollIntoViewAnimation {
  /** target node to be scrolled yo */
  target: HTMLElement;

  /** scrollable parent node default to document */
  parent?: HTMLElement;

  /** target element alignment relatively to parent based on current axis */
  alignment?: 'start' | 'end' | 'center';
}

interface ScrollIntoViewParams {
  /** callback fired after scroll */
  onScrollFinish?: () => void;

  /** duration of scroll in seconds */
  duration?: number;

  /** axis of scroll */
  axis?: 'x' | 'y';

  /** custom mathematical easing function */
  easing?: (t: number) => number;

  /** additional distance between nearest edge and element */
  offset?: number;
}

export function useScrollIntoView({
  duration = 1.25,
  axis = 'y',
  onScrollFinish,
  easing = easeInOutQuad,
  offset = 0,
}: ScrollIntoViewParams = {}) {
  const frameID = useRef(0);
  const startTime = useRef(0);

  const cancel = (): void => {
    cancelAnimationFrame(frameID.current);
  };

  const scrollIntoView = useCallback(
    ({ target, parent, alignment = 'start' }: ScrollIntoViewAnimation) => {
      if (frameID.current) {
        cancel();
      }

      const start = getScrollStart({ parent, axis }) ?? 0;
      const change =
        getRelativePosition({ parent, target, axis, alignment, offset }) - (parent ? 0 : start);

      function animateScroll() {
        if (startTime.current === 0) {
          startTime.current = performance.now();
        }

        const now = performance.now();
        const elapsed = (now - startTime.current) / 1000;

        // easing timing progress
        const t = duration === 0 ? 1 : elapsed / duration;

        const distance = start + change * easing(t);
        setScrollParam({ parent, axis, distance });

        if (t < 1) {
          frameID.current = requestAnimationFrame(animateScroll);
        } else {
          typeof onScrollFinish === 'function' && onScrollFinish();
          startTime.current = 0;
          cancel();
        }
      }
      animateScroll();
    },
    []
  );

  // cleanup RAF
  useEffect(() => cancel, []);

  return {
    scrollIntoView,
    cancel,
  };
}
