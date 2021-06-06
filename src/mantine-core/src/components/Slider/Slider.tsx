import React, { useRef, useState, useEffect } from 'react';
import cx from 'clsx';
import { DefaultProps, useMantineTheme, mergeStyles, MantineNumberSize } from '../../theme';
import { getClientPosition, ClientPositionEvent } from './get-client-position';
import { getPosition } from './get-position';
import { getChangeValue } from './get-change-value';
import { getDragEventsAssigner } from './get-drag-events-assigner';
import { Thumb } from './Thumb/Thumb';
import useStyles from './Slider.styles';

interface SliderProps
  extends DefaultProps<typeof useStyles>,
    Omit<React.ComponentPropsWithoutRef<'div'>, 'value' | 'onChange'> {
  color?: string;
  radius?: MantineNumberSize;
  size?: MantineNumberSize;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onChange?(value: number): void;
  name?: string;
  marks?: { value: number; label?: React.ReactNode }[];
  label?: React.ReactNode | ((value: number) => React.ReactNode);
}

export function Slider({
  className,
  style,
  themeOverride,
  classNames,
  styles,
  color,
  value,
  onChange,
  size = 'md',
  radius = 'xl',
  min = 0,
  max = 100,
  step = 1,
  defaultValue,
  name,
  marks = [],
  label = (f) => f,
}: SliderProps) {
  const theme = useMantineTheme(themeOverride);
  const classes = useStyles({ theme, color, radius, size }, classNames);
  const _styles = mergeStyles(classes, styles);
  const [dragging, setDragging] = useState(false);
  const [_value, setValue] = useState(
    typeof value === 'number' ? value : typeof defaultValue === 'number' ? defaultValue : 0
  );
  const container = useRef<HTMLDivElement>();
  const thumb = useRef<HTMLDivElement>();
  const start = useRef<number>();
  const offset = useRef<number>();
  const position = getPosition({ value: _value, min, max });
  const _label = typeof label === 'function' ? label(_value) : label;
  const markItems = marks.map((mark, index) => (
    <div
      className={classes.markWrapper}
      style={{ left: `${getPosition({ value: mark.value, min, max })}%` }}
      key={index}
    >
      <div className={cx(classes.mark, { [classes.markFilled]: mark.value <= _value })} />
      {mark.label && <div className={classes.markLabel}>{mark.label}</div>}
    </div>
  ));

  useEffect(() => {
    if (typeof value === 'number') {
      setValue(value);
    }
  }, [value]);

  const _setValue = (val: number) => {
    setValue(val);
    typeof onChange === 'function' && onChange(val);
  };

  const handleChange = (val: number) => {
    const containerWidth = container.current.getBoundingClientRect().width;
    const nextValue = getChangeValue({ value: val, containerWidth, min, max, step });
    _setValue(nextValue);
  };

  const assignEvents = getDragEventsAssigner({
    onDrag: (event: ClientPositionEvent) => {
      container.current.focus();
      handleChange(getClientPosition(event) + start.current - offset.current);
    },
    onDragEnd: () => {
      setDragging(false);
    },
  });

  function handleThumbMouseDown(
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) {
    event.preventDefault();
    event.stopPropagation();

    start.current = thumb.current.offsetLeft;
    offset.current = getClientPosition(event as any);

    assignEvents();
  }

  const handleTrackMouseDown = (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    const changePosition = getClientPosition(event as any);
    const rect = container.current.getBoundingClientRect();

    start.current = changePosition - rect.left;
    offset.current = changePosition;

    assignEvents();
    handleChange(changePosition - rect.left);
  };

  const handleTrackKeydownCapture = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.nativeEvent.code) {
      case 'ArrowUp':
      case 'ArrowRight': {
        event.preventDefault();
        thumb.current.focus();
        _setValue(Math.min(Math.max(_value + step, min), max));
        break;
      }

      case 'ArrowDown':
      case 'ArrowLeft': {
        event.preventDefault();
        thumb.current.focus();
        _setValue(Math.min(Math.max(_value - step, min), max));
        break;
      }

      default: {
        break;
      }
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      tabIndex={-1}
      className={cx(classes.root, className)}
      ref={container}
      onTouchStart={handleTrackMouseDown}
      onMouseDown={handleTrackMouseDown}
      onMouseDownCapture={() => setDragging(true)}
      onMouseUpCapture={() => setDragging(false)}
      onKeyDownCapture={handleTrackKeydownCapture}
      style={{ ...style, ..._styles.root }}
    >
      <div className={classes.track}>
        <div className={classes.bar} style={{ width: `${position}%` }} />
        <Thumb
          max={max}
          min={min}
          value={_value}
          position={position}
          dragging={dragging}
          color={color}
          size={size}
          label={_label}
          elementRef={thumb}
          onMouseDown={handleThumbMouseDown}
          classNames={classNames as any}
          styles={styles as any}
        />

        {markItems}
      </div>

      <input type="hidden" name={name} value={_value} />
    </div>
  );
}

Slider.displayName = '@mantine/core/Slider';
