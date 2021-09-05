import React from 'react';
import cx from 'clsx';
import { useUncontrolled } from '@mantine/hooks';
import {
  DefaultProps,
  useMantineTheme,
  MantineNumberSize,
  MantineSize,
  mergeStyles,
} from '../../../theme';
import { CheckboxIcon } from '../../Checkbox/CheckboxIcon';
import useStyles from './Chip.styles';

export type ChipStylesNames = keyof ReturnType<typeof useStyles>;

export interface ChipProps
  extends DefaultProps<ChipStylesNames>,
    Omit<React.ComponentPropsWithoutRef<'input'>, 'size' | 'onChange'> {
  /** Chip radius from theme or number to set value in px */
  radius?: MantineNumberSize;

  /** Predefined chip size */
  size?: MantineSize;

  /** Chip input type */
  type?: 'radio' | 'checkbox';

  /** Chip label */
  children: React.ReactNode;

  /** Checked state for controlled component */
  checked?: boolean;

  /** Default value for uncontrolled component */
  defaultChecked?: boolean;

  /** Calls when checked state changes */
  onChange?(checked: boolean): void;

  /** Active color from theme, defaults to theme.primaryColor */
  color?: string;
}

export function Chip({
  radius = 'xl',
  type = 'checkbox',
  size = 'sm',
  color,
  children,
  className,
  classNames,
  style,
  styles,
  checked,
  defaultChecked,
  onChange,
  themeOverride,
  ...others
}: ChipProps) {
  const theme = useMantineTheme(themeOverride);
  const classes = useStyles({ theme, radius, size, color }, classNames, 'chip');
  const _styles = mergeStyles(classes, styles);
  const [value, setValue] = useUncontrolled({
    value: checked,
    defaultValue: defaultChecked,
    finalValue: true,
    onChange,
    rule: (val) => typeof val === 'boolean',
  });

  return (
    // Rule is broken
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label
      className={cx(classes.root, { [classes.checked]: value }, className)}
      style={{ ...style, ..._styles.root, ...(value ? _styles.checked : null) }}
    >
      <input
        type={type}
        className={classes.input}
        style={_styles.input}
        checked={value}
        onChange={(event) => setValue(event.currentTarget.checked)}
        {...others}
      />
      {value && (
        <span className={classes.iconWrapper} style={_styles.iconWrapper}>
          <CheckboxIcon
            indeterminate={false}
            className={classes.checkIcon}
            style={{ ..._styles.checkIcon }}
          />
        </span>
      )}
      {children}
    </label>
  );
}
