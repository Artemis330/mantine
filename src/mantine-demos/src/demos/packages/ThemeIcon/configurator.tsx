import React from 'react';
import { RocketIcon } from '@modulz/radix-icons';
import { ThemeIcon, ThemeIconProps } from '@mantine/core';

const iconSizes = {
  xs: 10,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
};

function Wrapper(props: ThemeIconProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <ThemeIcon {...props}>
        <RocketIcon style={{ width: iconSizes[props.size], height: iconSizes[props.size] }} />
      </ThemeIcon>
    </div>
  );
}

const codeTemplate = (props: string) => `<ThemeIcon${props}>
  <RocketIcon />
</ThemeIcon>`;

export const configurator: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  codeTemplate,
  configurator: [
    {
      name: 'variant',
      type: 'segmented',
      initialValue: 'filled',
      defaultValue: 'filled',
      data: [
        { label: 'filled', value: 'filled' },
        { label: 'light', value: 'light' },
        { label: 'outline', value: 'outline' },
      ],
    },
    { name: 'radius', type: 'size', initialValue: 'sm', defaultValue: 'sm' },
    { name: 'size', type: 'size', initialValue: 'md', defaultValue: 'md' },
    { name: 'color', type: 'color', initialValue: 'blue', defaultValue: 'blue' },
  ],
};
