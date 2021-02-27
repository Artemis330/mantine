import React from 'react';
import { useMantineTheme, Container } from '@mantine/core';
import AppContainer from '../AppContainer/AppContainer';
import Navbar from '../Navbar/Navbar';
import useStyles from './Layout.styles';

export default function Layout({ children }: { children: React.ReactNode }) {
  const classes = useStyles({ theme: useMantineTheme() });
  return (
    <AppContainer>
      <main className={classes.layout}>
        <div className={classes.inner}>
          <Navbar className={classes.navbar} />
          <div className={classes.main}>
            <Container size="sm">{children}</Container>
          </div>
        </div>
      </main>
    </AppContainer>
  );
}
