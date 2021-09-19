import React from 'react';
import cx from 'clsx';
import { mergeStyles } from '@mantine/tss';
import { DefaultProps, MantineNumberSize, MantineColor } from '@mantine/theme';
import { getPosition } from '../utils/get-position/get-position';
import { isMarkFilled } from './is-mark-filled';
import useStyles from './Marks.styles';

export type MarksStylesNames = keyof ReturnType<typeof useStyles>;

interface MarksProps extends DefaultProps<MarksStylesNames> {
  marks: { value: number; label?: React.ReactNode }[];
  size: MantineNumberSize;
  color: MantineColor;
  min: number;
  max: number;
  value: number;
  onChange(value: number): void;
  offset?: number;
}

export function Marks({
  marks,
  color,
  size,
  min,
  max,
  value,
  classNames,
  styles,
  offset,
  onChange,
}: MarksProps) {
  const classes = useStyles({ size, color }, classNames, 'slider');
  const _styles = mergeStyles(classes, styles);

  const items = marks.map((mark, index) => (
    <div
      className={classes.markWrapper}
      style={{ ..._styles.markWrapper, left: `${getPosition({ value: mark.value, min, max })}%` }}
      key={index}
    >
      <div
        style={{ ..._styles.mark, ...(mark.value <= value ? _styles.markFilled : null) }}
        className={cx(classes.mark, {
          [classes.markFilled]: isMarkFilled({ mark, value, offset }),
        })}
      />
      {mark.label && (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
          className={classes.markLabel}
          style={_styles.markLabel}
          onMouseDown={(event) => {
            event.stopPropagation();
            onChange(mark.value);
          }}
          onTouchStart={(event) => {
            event.stopPropagation();
            onChange(mark.value);
          }}
        >
          {mark.label}
        </div>
      )}
    </div>
  ));

  return <div>{items}</div>;
}

Marks.displayName = '@mantine/core/SliderMarks';
