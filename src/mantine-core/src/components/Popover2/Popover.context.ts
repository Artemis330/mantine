import { Placement, ReferenceType } from '@floating-ui/react-dom-interactions';
import { createSafeContext } from '@mantine/utils';
import { MantineNumberSize, MantineShadow } from '@mantine/styles';
import { MantineTransition } from '../Transition';
import { POPOVER_ERRORS } from './Popover.errors';
import { PopoverWidth } from './Popover.types';

interface PopoverContext {
  x: number;
  y: number;
  opened: boolean;
  transition: MantineTransition;
  transitionDuration: number;
  reference: (node: ReferenceType) => void;
  floating: (node: HTMLElement) => void;
  width?: PopoverWidth;
  withArrow: boolean;
  arrowSize: number;
  arrowOffset: number;
  trapFocus: boolean;
  placement: Placement;
  withinPortal: boolean;
  closeOnEscape: boolean;
  zIndex: React.CSSProperties['zIndex'];
  radius?: MantineNumberSize;
  shadow?: MantineShadow;
  onClose?(): void;
  getDropdownId(): string;
  getTargetId(): string;
}

export const [PopoverContextProvider, usePopoverContext] = createSafeContext<PopoverContext>(
  POPOVER_ERRORS.context
);
