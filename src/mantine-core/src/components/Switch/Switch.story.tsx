import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import MantineProvider from '../../MantineProvider/MantineProvider';
import Switch from './Switch';

function SwitchWrapper(props: Omit<React.ComponentProps<typeof Switch>, 'value' | 'onChange'>) {
  const [value, onChange] = useState(false);
  return <Switch value={value} onChange={onChange} {...props} />;
}

storiesOf('@mantine/core', module).add('Switch', () => (
  <MantineProvider>
    <SwitchWrapper label="Turn on the notifications" />
    <SwitchWrapper label="Turn on the notifications" disabled style={{ marginTop: 15 }} />
  </MantineProvider>
));
