import React from 'react';
import { storiesOf } from '@storybook/react';
import { Header } from './Header/Header';
import { Navbar } from './Navbar/Navbar';
import { AppShell } from './AppShell';

storiesOf('@mantine/core/AppShell/AppShell', module).add('General usage', () => (
  <AppShell header={<Header height={50}>Header</Header>} navbar={<Navbar>Navbar</Navbar>}>
    App shell
  </AppShell>
));
