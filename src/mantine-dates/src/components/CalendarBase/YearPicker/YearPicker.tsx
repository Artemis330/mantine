import React, { useState } from 'react';
import { DefaultProps, ClassNames, UnstyledButton } from '@mantine/core';
import { getDecadeRange } from './get-decade-range/get-decade-range';
import { CalendarHeader } from '../CalendarHeader/CalendarHeader';
import useStyles from './YearPicker.styles';

export type YearPickerStylesNames = ClassNames<typeof useStyles>;

export interface YearPickerProps
  extends DefaultProps<YearPickerStylesNames>,
    Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'> {
  /** Selected year */
  value: number;

  /** Called when year changes */
  onChange(value: number): void;
}

export function YearPicker({
  className,
  styles,
  classNames,
  value,
  onChange,
  ...others
}: YearPickerProps) {
  const { classes, cx } = useStyles();
  const [decade, setDecade] = useState(value);
  const range = getDecadeRange(decade);

  const years = range.map((year) => (
    <UnstyledButton
      key={year}
      onClick={() => onChange(year)}
      className={cx(classes.yearPickerControl, {
        [classes.yearPickerControlActive]: year === value,
      })}
    >
      {year}
    </UnstyledButton>
  ));

  return (
    <div className={cx(classes.yearPicker, className)} {...others}>
      <CalendarHeader
        label={`${range[0]} – ${range[range.length - 1]}`}
        hasNext
        hasPrevious
        onNext={() => setDecade((current) => current + 10)}
        onPrevious={() => setDecade((current) => current - 10)}
        nextOrderDisabled
      />
      <div className={classes.yearPickerControls}>{years}</div>
    </div>
  );
}
