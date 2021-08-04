import React, { useState, useRef } from 'react';
import { useReducedMotion, useDidUpdate } from '@mantine/hooks';
import { useMantineTheme, DefaultProps } from '../../theme';
import { getTransitionStyles } from './get-transition-styles/get-transition-styles';
import { MantineTransition, transitions } from './transitions';

export { GroupedTransition } from './GroupedTransition';
export type { GroupedTransitionProps } from './GroupedTransition';

export const AVAILABLE_TRANSITIONS = Object.keys(transitions) as Array<keyof typeof transitions>;

export type { MantineTransition };

export interface TransitionProps extends Omit<DefaultProps, 'className'> {
  /** Predefined transition name or transition styles */
  transition: MantineTransition;

  /** Transition duration in ms */
  duration?: number;

  /** Transition timing function, defaults to theme.transitionTimingFunction */
  timingFunction?: string;

  /** When true, component will be mounted */
  mounted: boolean;

  /** Render function with transition styles argument */
  children(styles: React.CSSProperties): React.ReactElement<any, any>;

  /** Calls when exit transition ends */
  onExited?: () => void;

  /** Calls when exit transition starts */
  onExit?: () => void;

  /** Calls when enter transition starts */
  onEnter?: () => void;

  /** Calls when enter transition ends */
  onEntered?: () => void;
}

type TransitionStatus =
  | 'entered'
  | 'exited'
  | 'entering'
  | 'exiting'
  | 'pre-exiting'
  | 'pre-entering';

export function Transition({
  transition,
  duration = 250,
  mounted,
  children,
  themeOverride,
  timingFunction,
  onExit,
  onEntered,
  onEnter,
  onExited,
}: TransitionProps) {
  const theme = useMantineTheme(themeOverride);
  const reduceMotion = useReducedMotion();
  const transitionDuration = reduceMotion ? 0 : duration;
  const [status, setStatus] = useState<TransitionStatus>(mounted ? 'entered' : 'exited');
  const timeoutRef = useRef<number>(-1);

  const handleStateChange = (shouldMount: boolean) => {
    const preHandler = shouldMount ? onEnter : onExit;
    const handler = shouldMount ? onEntered : onExited;

    setStatus(shouldMount ? 'pre-entering' : 'pre-exiting');
    window.clearTimeout(timeoutRef.current);

    const preStateTimeout = window.setTimeout(() => {
      typeof preHandler === 'function' && preHandler();
      setStatus(shouldMount ? 'entering' : 'exiting');
    }, 10);

    timeoutRef.current = window.setTimeout(() => {
      window.clearTimeout(preStateTimeout);
      typeof handler === 'function' && handler();
      setStatus(shouldMount ? 'entered' : 'exited');
    }, duration);
  };

  useDidUpdate(() => {
    handleStateChange(mounted);
  }, [mounted]);

  if (transitionDuration === 0) {
    return mounted ? <>{children({})}</> : null;
  }

  return status === 'exited'
    ? null
    : children(
        getTransitionStyles({
          transition,
          duration: transitionDuration,
          state: status,
          timingFunction: timingFunction || theme.transitionTimingFunction,
        })
      );
}

Transition.displayName = '@mantine/core/Transition';
