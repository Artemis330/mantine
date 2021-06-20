import React, { useRef, useEffect } from 'react';
import cx from 'clsx';
import { DefaultProps, useMantineTheme, Text } from '@mantine/core';
import { upperFirst } from '@mantine/hooks';
import { getMonthDays, isSameMonth, getWeekdaysNames } from '../../utils';
import Day from './Day/Day';
import useStyles from './Month.styles';

export interface MonthProps
  extends DefaultProps,
    Omit<React.ComponentPropsWithoutRef<'table'>, 'onChange' | 'value'> {
  /** Date at which month should be shown */
  month: Date;

  /** Locale is used to get weekdays names with date.toLocaleDateString  */
  locale?: string;

  /** Selected date */
  value?: Date;

  /** Autofocus selected date on mount, if no date is selected autofocus is applied to first month day */
  autoFocus?: boolean;

  /** When true dates that are outside of given month cannot be clicked or focused */
  disableOutsideEvents?: boolean;

  /** Called when day is selected */
  onChange?(value: Date): void;
}

export function Month({
  className,
  month,
  value,
  onChange,
  autoFocus = false,
  disableOutsideEvents = false,
  locale = 'en',
  themeOverride,
  ...others
}: MonthProps) {
  const classes = useStyles({ theme: useMantineTheme(themeOverride) });
  const daysRefs = useRef<Record<string, HTMLButtonElement>>({});
  const days = getMonthDays(month);

  const focusDay = (date: Date, diff: number) => {
    const offset = new Date(date);
    offset.setDate(date.getDate() + diff);

    if (offset.toISOString() in daysRefs.current) {
      if (!(!isSameMonth(month, offset) && disableOutsideEvents)) {
        daysRefs.current[offset.toISOString()].focus();
      }
    }
  };

  const handleKeyDown = (currentDate: Date, event: React.KeyboardEvent) => {
    const { code } = event.nativeEvent;

    if (code === 'ArrowUp') {
      event.preventDefault();
      focusDay(currentDate, -7);
    }

    if (code === 'ArrowDown') {
      event.preventDefault();
      focusDay(currentDate, 7);
    }

    if (code === 'ArrowRight') {
      event.preventDefault();
      currentDate.getDay() !== 0 && focusDay(currentDate, 1);
    }

    if (code === 'ArrowLeft') {
      event.preventDefault();
      currentDate.getDay() !== 1 && focusDay(currentDate, -1);
    }
  };

  useEffect(() => {
    if (autoFocus) {
      const date = new Date(
        month.getFullYear(),
        month.getMonth(),
        value ? value.getDate() : 1
      ).toISOString();

      if (date in daysRefs.current) {
        daysRefs.current[date].focus();
      }
    }
  }, []);

  const weekdays = getWeekdaysNames(locale).map((weekday) => (
    <th key={weekday}>
      <Text color="gray" size="xs">
        {upperFirst(weekday)}
      </Text>
    </th>
  ));

  const rows = days.map((row, rowIndex) => {
    const cells = row.map((date, cellIndex) => {
      const weekday = date.getDay();
      const weekend = weekday === 6 || weekday === 0;
      const outside = date.getMonth() !== month.getMonth();
      const isSelected =
        value instanceof Date &&
        date.getFullYear() === value.getFullYear() &&
        date.getMonth() === value.getMonth() &&
        date.getDate() === value.getDate();

      return (
        <td key={cellIndex}>
          <Day
            elementRef={(button) => {
              daysRefs.current[date.toISOString()] = button;
            }}
            onClick={() => typeof onChange === 'function' && onChange(date)}
            value={date}
            outside={outside}
            weekend={weekend}
            selected={isSelected}
            disableOutsideEvents={disableOutsideEvents}
            onKeyDown={handleKeyDown}
            themeOverride={themeOverride}
          />
        </td>
      );
    });

    return <tr key={rowIndex}>{cells}</tr>;
  });

  return (
    <table className={cx(classes.month, className)} {...others}>
      <thead>
        <tr>{weekdays}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

Month.displayName = '@mantine/core/Month';
