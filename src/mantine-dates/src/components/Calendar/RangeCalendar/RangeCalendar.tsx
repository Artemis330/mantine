import React, { useState } from 'react';
import { DefaultProps, getSizeValue } from '@mantine/core';
import { useUncontrolled } from '@mantine/hooks';
import dayjs from 'dayjs';
import { CalendarHeader } from '../CalendarHeader/CalendarHeader';
import { Month } from '../../Month/Month';
import { CalendarSettings, CalendarStylesNames } from '../Calendar';
import { sizes as DAY_SIZES } from '../../Month/Day/Day.styles';

interface RangeCalendarProps
  extends DefaultProps<CalendarStylesNames>,
    CalendarSettings,
    Omit<React.ComponentPropsWithoutRef<'div'>, 'value' | 'onChange'> {
  /** Current month */
  month?: Date;

  /** Selected dates */
  range: [Date, Date];

  /** Called when selected date changes */
  onRangeChange(value: [Date, Date]): void;

  /** Called when month changes */
  onMonthChange?(value: Date): void;

  /** Static css selector base */
  __staticSelector?: string;
}

export function RangeCalendar({
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
  range,
  onRangeChange,
  labelFormat = 'MMMM YYYY',
  withSelect = false,
  yearsRange = { from: 2020, to: 2030 },
  dayClassName,
  dayStyle,
  disableOutsideEvents,
  minDate,
  maxDate,
  excludeDate,
  fullWidth = false,
  size = 'sm',
  __staticSelector = 'calendar',
  ...others
}: RangeCalendarProps) {
  const [currentRange, setCurrentRange] = useState<[Date, Date]>(range || [null, null]);
  const setRangeDate = (date: Date) => {
    setCurrentRange([date, date]);
  };

  const [_month, setMonth] = useUncontrolled({
    value: month,
    defaultValue: initialMonth,
    finalValue: new Date(),
    onChange: onMonthChange,
    rule: (val) => val instanceof Date,
  });

  const nextDisabled = maxDate instanceof Date && dayjs(_month).endOf('month').isAfter(maxDate);
  const previousDisabled =
    minDate instanceof Date && dayjs(_month).startOf('month').isBefore(minDate);

  return (
    <div
      className={className}
      style={{
        maxWidth: fullWidth ? '100%' : getSizeValue({ size, sizes: DAY_SIZES }) * 7,
        ...style,
      }}
      {...others}
    >
      <CalendarHeader
        size={size}
        themeOverride={themeOverride}
        nextMonthLabel={nextMonthLabel}
        previousMonthLabel={previousMonthLabel}
        previousMonthDisabled={previousDisabled}
        nextMonthDisabled={nextDisabled}
        onPreviousMonth={() => setMonth(dayjs(_month).subtract(1, 'month').toDate())}
        onNextMonth={() => setMonth(dayjs(_month).add(1, 'month').toDate())}
        classNames={classNames}
        styles={styles}
        locale={locale}
        withSelect={withSelect}
        yearsRange={yearsRange}
        month={_month}
        setMonth={setMonth}
        labelFormat={labelFormat}
        __staticSelector={__staticSelector}
      />

      <Month
        themeOverride={themeOverride}
        month={_month}
        range={currentRange}
        onChange={setRangeDate}
        dayClassName={dayClassName}
        dayStyle={dayStyle}
        disableOutsideEvents={disableOutsideEvents}
        minDate={minDate}
        maxDate={maxDate}
        excludeDate={excludeDate}
        classNames={classNames as any}
        styles={styles as any}
        fullWidth={fullWidth}
        size={size}
        __staticSelector={__staticSelector}
      />
    </div>
  );
}

RangeCalendar.displayName = '@mantine/dates/RangeCalendar';
