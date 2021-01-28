import React, { forwardRef, useState } from 'react';
import { useId } from '@mantine/hooks';
import { EyeOpenIcon, EyeClosedIcon } from '@modulz/radix-icons';
import { DefaultProps } from '@mantine/types';
import InputWrapper, { InputWrapperBaseProps } from '../InputWrapper/InputWrapper';
import ActionIcon from '../ActionIcon/ActionIcon';
import Input from '../Input/Input';
import classes from './PasswordInput.styles.less';

interface PasswordInputProps
  extends DefaultProps,
    InputWrapperBaseProps,
    Omit<React.HTMLProps<HTMLInputElement>, 'onChange' | 'ref'> {
  value: string;
  onChange(value: string): void;
  id?: string;
  icon?: React.ReactNode;
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
      ...others
    }: PasswordInputProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
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
      >
        <div className={classes.wrapper}>
          <Input
            {...others}
            ref={ref}
            inputClassName={classes.input}
            type={reveal ? 'text' : 'password'}
            value={value}
            invalid={!!error}
            onChange={(event) => onChange(event.currentTarget.value)}
            icon={icon}
          />
          <ActionIcon className={classes.control} onClick={() => setReveal((current) => !current)}>
            {reveal ? <EyeClosedIcon /> : <EyeOpenIcon />}
          </ActionIcon>
        </div>
      </InputWrapper>
    );
  }
);

PasswordInput.displayName = '@mantine/core/PasswordInput';

export default PasswordInput;
