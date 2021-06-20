import React from 'react';
import cx from 'clsx';
import dayjs from 'dayjs';
import { DefaultProps, useMantineTheme, mergeStyles, Text, Group, ActionIcon } from '@mantine/core';
import { useUncontrolled } from '@mantine/hooks';
import { Month } from '../Month/Month';
import { ArrowIcon } from './ArrowIcon';
import { CalendarLabel } from './CalendarLabel/CalendarLabel';
import useStyles from './Calendar.styles';

interface CalendarProps
  extends DefaultProps<typeof useStyles>,
    Omit<React.ComponentPropsWithoutRef<'div'>, 'value' | 'onChange'> {
  initialMonth?: Date;
  month?: Date;
  value?: Date;
  onChange?(value: Date): void;
  nextMonthLabel?: string;
  previousMonthLabel?: string;
  locale?: string;
  onMonthChange?(value: Date): void;
  labelFormat?: string;
  withMonthPicker?: boolean;
  yearsRange?: { from: number; to: number };
}

export function Calendar({
  className,
  classNames,
  styles,
  style,
  locale = 'en',
  themeOverride,
  nextMonthLabel,
  previousMonthLabel,
  initialMonth,
  month,
  onMonthChange,
  value,
  onChange,
  labelFormat = 'MMMM YYYY',
  withMonthPicker = false,
  yearsRange = { from: 2020, to: 2030 },
}: CalendarProps) {
  const theme = useMantineTheme(themeOverride);
  const classes = useStyles({ theme }, classNames, 'calendar');
  const _styles = mergeStyles(classes, styles);
  const [_month, setMonth] = useUncontrolled({
    value: month,
    defaultValue: initialMonth,
    finalValue: new Date(),
    onChange: onMonthChange,
    rule: (val) => val instanceof Date,
  });

  return (
    <div className={cx(classes.root, className)} style={{ ...style, ..._styles.root }}>
      <Group className={classes.header} position="apart">
        <ActionIcon
          aria-label={nextMonthLabel}
          onClick={() => setMonth(dayjs(_month).subtract(1, 'month').toDate())}
        >
          <ArrowIcon direction="left" width={14} height={14} />
        </ActionIcon>

        <CalendarLabel
          locale={locale}
          classNames={classNames as any}
          styles={styles as any}
          withMonthPicker
          withYearPicker
          yearsRange={yearsRange}
          value={_month}
          onChange={setMonth}
        />

        <ActionIcon
          aria-label={previousMonthLabel}
          onClick={() => setMonth(dayjs(_month).add(1, 'month').toDate())}
        >
          <ArrowIcon direction="right" width={14} height={14} />
        </ActionIcon>
      </Group>

      <Month month={_month} value={value} onChange={onChange} />
    </div>
  );
}

Calendar.displayName = '@mantine/dates/Calendar';
