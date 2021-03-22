import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { DEFAULT_THEME } from '@mantine/theme';
import { Button } from '../Button/Button';
import { ElementsGroup } from '../ElementsGroup/ElementsGroup';
import { Progress } from './Progress';

function SetDemo() {
  const [value, setValue] = useState(50);
  const setValueToRandom = () => setValue(Math.round(Math.random() * 99));

  return (
    <div style={{ maxWidth: 500, padding: 50 }}>
      <Progress value={value} />
      <ElementsGroup style={{ marginTop: 20 }}>
        <Button onClick={setValueToRandom}>Set random value</Button>
      </ElementsGroup>
    </div>
  );
}

const sizes = ([2, 'xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
  <Progress size={size} value={50} key={size} style={{ marginTop: 20 }} />
));

const themes = Object.keys(DEFAULT_THEME.colors).map((color) => (
  <Progress key={color} color={color} value={50} style={{ marginTop: 20 }} />
));

storiesOf('@mantine/core/Progress', module)
  .add('General usage', () => (
    <div style={{ maxWidth: 500, padding: 50 }}>
      <Progress value={0} />
      <Progress value={20} style={{ marginTop: 20 }} />
      <Progress value={40} style={{ marginTop: 20 }} />
      <Progress value={60} style={{ marginTop: 20 }} />
      <Progress value={80} style={{ marginTop: 20 }} />
      <Progress value={100} style={{ marginTop: 20 }} />
    </div>
  ))
  .add('Sizes', () => <div style={{ maxWidth: 500, padding: 50 }}>{sizes}</div>)
  .add('Themes', () => <div style={{ maxWidth: 500, padding: 50 }}>{themes}</div>)
  .add('Value changes', () => <SetDemo />);
