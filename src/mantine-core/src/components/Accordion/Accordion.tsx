import React from 'react';
import { DefaultProps, useMantineDefaultProps, StylesApiProvider } from '@mantine/styles';
import { Box } from '../Box';
import { AccordionProviderProps, AccordionProvider } from './AccordionProvider';
import { AccordionItem, AccordionItemStylesNames } from './AccordionItem/AccordionItem';
import { ChevronIcon } from './ChevronIcon';

export type AccordionStylesNames = AccordionItemStylesNames;

export interface AccordionProps<Multiple extends boolean = false>
  extends AccordionProviderProps<Multiple>,
    DefaultProps<AccordionItemStylesNames>,
    Omit<React.ComponentPropsWithoutRef<'div'>, keyof AccordionProviderProps<Multiple>> {}

const defaultProps: Partial<AccordionProps> = {
  multiple: false,
  disableIconRotation: false,
  transitionDuration: 200,
  iconPosition: 'left',
  offsetIcon: true,
  iconSize: 24,
  order: 3,
  icon: <ChevronIcon />,
};

export function Accordion<Multiple extends boolean = false>(props: AccordionProps<Multiple>) {
  const {
    id,
    loop,
    children,
    multiple,
    value,
    defaultValue,
    onChange,
    transitionDuration,
    disableIconRotation,
    iconPosition,
    offsetIcon,
    iconSize,
    order,
    icon,
    classNames,
    styles,
    unstyled,
    ...others
  } = useMantineDefaultProps<AccordionProps<Multiple>>(
    'Accordion',
    defaultProps as AccordionProps<Multiple>,
    props
  );

  return (
    <AccordionProvider
      id={id}
      multiple={multiple}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      loop={loop}
      transitionDuration={transitionDuration}
      disableIconRotation={disableIconRotation}
      iconPosition={iconPosition}
      offsetIcon={offsetIcon}
      iconSize={iconSize}
      order={order}
      icon={icon}
    >
      <StylesApiProvider classNames={classNames} styles={styles} unstyled={unstyled}>
        <Box {...others} data-accordion>
          {children}
        </Box>
      </StylesApiProvider>
    </AccordionProvider>
  );
}

Accordion.Item = AccordionItem;
Accordion.displayName = '@mantine/core/Accordion';
