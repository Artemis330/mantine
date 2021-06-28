import { clamp } from '@mantine/hooks';
import { padTime } from '../pad-time/pad-time';

interface CreateTimeHandler {
  onChange(value: string): void;
  nextRef?: React.RefObject<HTMLInputElement>;
  min: number;
  max: number;
  maxValue: number;
}

export function createTimeHandler({ onChange, nextRef, min, max, maxValue }: CreateTimeHandler) {
  return (value: string) => {
    if (value === '00') {
      onChange('00');
      nextRef?.current.focus();
      nextRef?.current.select();
      return null;
    }

    const parsed = parseInt(value, 10);

    if (Number.isNaN(parsed)) {
      return null;
    }

    if (parsed > maxValue) {
      onChange(padTime(clamp({ value: parsed, min, max })));
      nextRef?.current.focus();
      nextRef?.current.select();
      return null;
    }

    onChange(parsed.toString());
    return null;
  };
}
