import React, { forwardRef, useState } from 'react';
import { useId } from '@mantine/hooks';
import { EyeOpenIcon, EyeClosedIcon } from '@modulz/radix-icons';
import { DefaultProps, MantineNumberSize } from '@mantine/theme';
import InputWrapper, { InputWrapperBaseProps } from '../InputWrapper/InputWrapper';
import ActionIcon from '../ActionIcon/ActionIcon';
import Input from '../Input/Input';
import useStyles from './PasswordInput.styles';

interface PasswordInputProps
  extends DefaultProps,
    InputWrapperBaseProps,
    Omit<React.HTMLProps<HTMLInputElement>, 'onChange' | 'ref' | 'label'> {
  value: string;
  onChange(value: string): void;
  id?: string;
  icon?: React.ReactNode;
  radius?: MantineNumberSize;
  showPasswordLabel?: string;
  hidePasswordLabel?: string;
}

const PasswordInput = forwardRef(
  (
    {
      className,
      id,
      value,
      label,
      error,
      required,
      style,
      onChange,
      icon,
      radius,
      hidePasswordLabel,
      showPasswordLabel,
      themeOverride,
      ...others
    }: PasswordInputProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const classes = useStyles();
    const [reveal, setReveal] = useState(false);
    const uuid = useId(id);

    return (
      <InputWrapper
        className={className}
        required={required}
        id={uuid}
        label={label}
        error={error}
        style={style}
        themeOverride={themeOverride}
      >
        <div className={classes.wrapper}>
          <Input
            {...others}
            radius={radius}
            ref={ref}
            inputClassName={classes.input}
            type={reveal ? 'text' : 'password'}
            value={value}
            invalid={!!error}
            onChange={(event) => onChange(event.currentTarget.value)}
            icon={icon}
            themeOverride={themeOverride}
          />
          <ActionIcon
            className={classes.control}
            onClick={() => setReveal((current) => !current)}
            themeOverride={themeOverride}
            title={reveal ? hidePasswordLabel : showPasswordLabel}
            aria-label={reveal ? hidePasswordLabel : showPasswordLabel}
          >
            {reveal ? <EyeClosedIcon /> : <EyeOpenIcon />}
          </ActionIcon>
        </div>
      </InputWrapper>
    );
  }
);

PasswordInput.displayName = '@mantine/core/PasswordInput';

export default PasswordInput;
