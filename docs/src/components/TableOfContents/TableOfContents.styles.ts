import { createUseStyles } from 'react-jss';
import { theming, MantineTheme, hexToRgba } from '@mantine/core';

export const TABLE_OF_CONTENTS_WIDTH = 240;
export const TABLE_OF_CONTENTS_BREAKPOINT = 1080;

export default createUseStyles(
  (theme: MantineTheme) => ({
    wrapper: {
      boxSizing: 'border-box',
      paddingLeft: theme.spacing.md,
      position: 'sticky',
      top: theme.spacing.xl,
      right: 0,
      flex: `0 0 ${TABLE_OF_CONTENTS_WIDTH}px`,

      [`@media (max-width: ${TABLE_OF_CONTENTS_BREAKPOINT}px)`]: {
        display: 'none',
      },
    },

    inner: {
      paddingTop: 49,
      paddingBottom: theme.spacing.xl,
      paddingLeft: theme.spacing.md,
      minHeight: 'calc(100vh - 100px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },

    items: {
      borderLeft: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
    },

    link: {
      display: 'block',
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
      borderLeft: '1px solid transparent',
      padding: [8, theme.spacing.md],
      marginLeft: -1,
    },

    linkActive: {
      borderLeftColor: theme.colors.blue[5],
      backgroundColor:
        theme.colorScheme === 'dark' ? hexToRgba(theme.colors.blue[9], 0.45) : theme.colors.blue[0],
      color: theme.colorScheme === 'dark' ? theme.colors.blue[1] : theme.colors.blue[8],
    },

    header: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing.md,
    },

    title: {
      marginLeft: theme.spacing.md,
    },

    shortcut: {
      marginTop: theme.spacing.xs,
    },

    shortcutLabel: {
      display: 'inline',
      marginLeft: theme.spacing.xs,
    },

    shortcuts: {
      marginTop: theme.spacing.xl * 2,
    },
  }),
  { theming }
);
