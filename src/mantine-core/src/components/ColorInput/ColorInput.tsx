import React, { useState } from 'react';
import { useUncontrolled, useReducedMotion } from '@mantine/hooks';
import { DefaultProps, MantineSize, mergeStyles, useMantineTheme } from '../../theme';
import {
  InputWrapper,
  InputWrapperBaseProps,
  InputWrapperStylesNames,
} from '../InputWrapper/InputWrapper';
import { Input, InputBaseProps, InputStylesNames } from '../Input/Input';
import { ColorSwatch } from '../ColorSwatch/ColorSwatch';
import { Popper } from '../Popper/Popper';
import { Paper } from '../Paper/Paper';
import { ColorPicker } from './ColorPicker/ColorPicker';
import { convertHsvaTo, isColorValid, parseColor } from './converters';
import useStyles from './ColorInput.styles';

export type ColorInputStylesNames = InputWrapperStylesNames | InputStylesNames;

export interface ColorInputProps
  extends InputWrapperBaseProps,
    InputBaseProps,
    DefaultProps<ColorInputStylesNames>,
    Omit<React.ComponentPropsWithoutRef<'input'>, 'size' | 'onChange'> {
  /** Input size */
  size?: MantineSize;

  /** Value for controlled input */
  value?: string;

  /** Default value for uncontrolled input */
  defaultValue?: string;

  /** Called when value changes */
  onChange?(color: string): void;

  /** Color format */
  format?: 'hex' | 'rgba' | 'rgb' | 'hsl' | 'hsla';
}

export function ColorInput({
  label,
  description,
  error,
  required,
  wrapperProps,
  size = 'sm',
  format = 'hex',
  onChange,
  value,
  defaultValue,
  classNames,
  styles,
  themeOverride,
  ...others
}: ColorInputProps) {
  const theme = useMantineTheme(themeOverride);
  const classes = useStyles({ theme }, classNames as any, 'color-input');
  const _styles = mergeStyles(classes, styles as any);
  const [referenceElement, setReferenceElement] = useState<HTMLDivElement>(null);
  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: '',
    rule: (val) => isColorValid(format, val),
    onChange,
  });

  const [parsed, setParsed] = useState(parseColor(_value));
  const handleParsedChange = (val: Partial<typeof parsed>) => {
    setParsed((current) => {
      const nextValue = { ...current, ...val };
      setValue(convertHsvaTo(format, nextValue));
      return nextValue;
    });
  };

  return (
    <InputWrapper
      label={label}
      description={description}
      error={error}
      required={required}
      classNames={classNames as any}
      styles={styles as any}
      size={size}
      {...wrapperProps}
    >
      <div ref={setReferenceElement}>
        <Input<'input'>
          {...others}
          spellCheck={false}
          size={size}
          value={_value}
          onChange={(event) => setValue(event.currentTarget.value)}
          icon={<ColorSwatch color={_value} size={18} />}
        />
      </div>

      <Popper
        referenceElement={referenceElement}
        transitionDuration={useReducedMotion() ? 0 : 150}
        transition="pop-top-left"
        mounted
        position="bottom"
        placement="start"
        gutter={5}
        withArrow
        arrowSize={3}
        zIndex={100}
        arrowClassName={classes.arrow}
        arrowStyle={{ ..._styles.arrow, left: 15 }}
      >
        <div style={{ pointerEvents: 'all' }}>
          <Paper shadow="sm" padding="sm" className={classes.dropdownBody}>
            <ColorPicker
              value={parsed}
              onChange={handleParsedChange}
              withAlpha={format === 'rgba' || format === 'hsla'}
            />
          </Paper>
        </div>
      </Popper>
    </InputWrapper>
  );
}

ColorInput.displayName = '@mantine/core/ColorInput';
