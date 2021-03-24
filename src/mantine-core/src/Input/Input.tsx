import React from 'react';
import cx from 'clsx';
import { DefaultProps, useMantineTheme, MantineNumberSize } from '@mantine/theme';
import { ComponentPassThrough } from '@mantine/types';
import useStyles from './Input.styles';

interface InputProps extends DefaultProps {
  /** Sets border color to red */
  invalid?: boolean;

  /** Adds icon on the left side of input */
  icon?: React.ReactNode;

  /** Right section of input, similar to icon but on the right */
  rightSection?: React.ReactNode;

  /** Width of right section, is used to calculate input padding-right */
  rightSectionWidth?: number;

  /** Add className to input element */
  inputClassName?: string;

  /** Properties spread to root element */
  wrapperProps?: Record<string, any>;

  /** Adds style to input element */
  inputStyle?: React.CSSProperties;

  /** Sets aria-required=true on input element */
  required?: boolean;

  /** Input border-radius from theme or number to set border-radius in px */
  radius?: MantineNumberSize;

  /** Defines input appearance */
  variant?: 'default' | 'filled' | 'unstyled';
}

export function Input<
  T extends React.ElementType = 'input',
  U extends HTMLElement = HTMLButtonElement
>({
  component: Element = 'input',
  className,
  invalid = false,
  required = false,
  variant = 'default',
  icon,
  style,
  rightSectionWidth = 36,
  rightSection,
  radius = 'sm',
  inputClassName,
  inputStyle,
  themeOverride,
  wrapperProps,
  elementRef,
  ...others
}: ComponentPassThrough<T, InputProps> & { elementRef?: React.ForwardedRef<U> }) {
  const theme = useMantineTheme(themeOverride);
  const classes = useStyles({ radius, theme });

  return (
    <div
      className={cx(
        classes.inputWrapper,
        { [classes.invalid]: invalid },
        classes[`${variant}Variant`],
        className
      )}
      style={style}
      {...wrapperProps}
    >
      {icon && (
        <div data-mantine-icon className={classes.icon}>
          {icon}
        </div>
      )}

      <Element
        {...others}
        data-mantine-input
        ref={elementRef}
        aria-required={required}
        className={cx({ [classes.withIcon]: icon }, classes.input, inputClassName)}
        style={{
          paddingRight: rightSection ? rightSectionWidth : theme.spacing.md,
          ...inputStyle,
        }}
      />

      {rightSection && (
        <div
          data-mantine-input-section
          style={{ width: rightSectionWidth }}
          className={classes.rightSection}
        >
          {rightSection}
        </div>
      )}
    </div>
  );
}

Input.displayName = '@mantine/core/Input';
