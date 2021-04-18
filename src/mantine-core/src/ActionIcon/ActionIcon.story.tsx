import React from 'react';
import { storiesOf } from '@storybook/react';
import { GearIcon } from '@modulz/radix-icons';
import { DEFAULT_THEME } from '@mantine/theme';
import { ElementsGroup } from '../ElementsGroup/ElementsGroup';
import { ActionIcon } from './ActionIcon';

const getThemes = (props?: any, iconProps?: any) =>
  Object.keys(DEFAULT_THEME.colors).map((color) => (
    <ActionIcon key={color} color={color} {...props}>
      <GearIcon {...iconProps} />
    </ActionIcon>
  ));

storiesOf('@mantine/core/ActionIcon', module)
  .add('Themes', () => <ElementsGroup>{getThemes()}</ElementsGroup>)
  .add('Transparent variant', () => (
    <ElementsGroup>{getThemes({ variant: 'transparent' })}</ElementsGroup>
  ))
  .add('Filled variant', () => <ElementsGroup>{getThemes({ variant: 'filled' })}</ElementsGroup>)
  .add('Hover variant', () => <ElementsGroup>{getThemes({ variant: 'hover' })}</ElementsGroup>)
  .add('Disabled', () => <ElementsGroup>{getThemes({ disabled: true })}</ElementsGroup>)
  .add('Sizes', () => (
    <>
      <ElementsGroup>
        {getThemes({ size: 'xs' }, { style: { width: 12, height: 12 } })}
      </ElementsGroup>
      <ElementsGroup style={{ marginTop: 20 }}>
        {getThemes({ size: 'sm' }, { style: { width: 14, height: 14 } })}
      </ElementsGroup>
      <ElementsGroup style={{ marginTop: 20 }}>
        {getThemes({ size: 'md' }, { style: { width: 16, height: 16 } })}
      </ElementsGroup>
      <ElementsGroup style={{ marginTop: 20 }}>
        {getThemes({ size: 'lg' }, { style: { width: 22, height: 22 } })}
      </ElementsGroup>
      <ElementsGroup style={{ marginTop: 20 }}>
        {getThemes({ size: 'xl' }, { style: { width: 28, height: 28 } })}
      </ElementsGroup>
      <ElementsGroup style={{ marginTop: 20 }}>
        {getThemes({ size: 100 }, { style: { width: 80, height: 80 } })}
      </ElementsGroup>
    </>
  ))
  .add('Autofocus', () => (
    <ActionIcon autoFocus>
      <GearIcon />
    </ActionIcon>
  ))
  .add('Dark theme', () => (
    <div style={{ background: DEFAULT_THEME.colors.dark[7], minHeight: '100vh', padding: 30 }}>
      <ElementsGroup>
        {getThemes({ variant: 'filled', themeOverride: { colorScheme: 'dark' } })}
      </ElementsGroup>
      <ElementsGroup style={{ marginTop: 20 }}>
        {getThemes({ variant: 'transparent', themeOverride: { colorScheme: 'dark' } })}
      </ElementsGroup>
      <ElementsGroup style={{ marginTop: 20 }}>
        {getThemes({ variant: 'hover', themeOverride: { colorScheme: 'dark' } })}
      </ElementsGroup>
    </div>
  ));
