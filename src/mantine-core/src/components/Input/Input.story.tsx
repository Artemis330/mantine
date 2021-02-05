import React from 'react';
import { storiesOf } from '@storybook/react';
import { LockClosedIcon } from '@modulz/radix-icons';
import MantineProvider from '../../MantineProvider/MantineProvider';
import Input from './Input';

storiesOf('@mantine/core', module).add('Input', () => (
  <MantineProvider>
    <div style={{ maxWidth: 300 }}>
      <Input placeholder="Input" />
      <Input placeholder="Input" invalid style={{ marginTop: 15 }} />
      <Input placeholder="Your password" icon={<LockClosedIcon />} style={{ marginTop: 15 }} />
      <Input placeholder="Unstyled" variant="unstyled" style={{ marginTop: 15 }} />
      <Input
        placeholder="Unstyled with icon"
        variant="unstyled"
        icon={<LockClosedIcon />}
        style={{ marginTop: 15 }}
      />
    </div>
  </MantineProvider>
));
