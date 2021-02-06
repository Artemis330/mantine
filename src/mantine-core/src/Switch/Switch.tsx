import React, { forwardRef } from 'react';
import cx from 'clsx';
import { useId } from '@mantine/hooks';
import { MantineColor, DefaultProps, useMantineTheme } from '@mantine/theme';
import useStyles from './Switch.styles';

interface SwitchProps
  extends DefaultProps,
    Omit<React.HTMLProps<HTMLDivElement>, 'label' | 'value' | 'onChange'> {
  value: boolean;
  onChange(value: boolean): void;
  label: React.ReactNode;
  disabled?: boolean;
  id?: string;
  color: MantineColor;
}

const Switch = forwardRef(
  (
    { className, value, color, onChange, label, disabled, id, ...others }: SwitchProps,
    ref: React.ForwardedRef<HTMLButtonElement>
  ) => {
    const classes = useStyles({ color, theme: useMantineTheme() });
    const uuid = useId(id);

    return (
      <div className={cx(classes.wrapper, className)} {...others}>
        <button
          ref={ref}
          disabled={disabled}
          className={cx(classes.switch, { [classes.checked]: value })}
          type="button"
          role="checkbox"
          onClick={() => onChange(!value)}
          aria-checked={value}
          id={uuid}
        />

        <label className={classes.label} htmlFor={uuid}>
          {label}
        </label>
      </div>
    );
  }
);

Switch.displayName = '@mantine/core/Switch';

export default Switch;
