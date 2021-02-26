import 'normalize.css';
import '@fontsource/ibm-plex-mono/700.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from 'react';
import { useMantineTheme } from '@mantine/core';
import useStyles from './AppContainer.styles';

export default function AppContainer({ children }: { children: React.ReactNode }) {
  useStyles({ theme: useMantineTheme() });
  return <>{children}</>;
}
