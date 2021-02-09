import { createUseStyles } from 'react-jss';
import { theming, MantineTheme, MantineNumberSize } from '@mantine/theme';

export type ElementsGroupPosition = 'right' | 'center' | 'left' | 'apart';

interface ElementsGroupStylesProps {
  position: ElementsGroupPosition;
  noWrap: boolean;
  grow: boolean;
  spacing: MantineNumberSize;
}

const JUSTIFY_CONTENT = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
  apart: 'space-between',
};

export default createUseStyles(
  (theme: MantineTheme) => ({
    elementsGroup: (props: ElementsGroupStylesProps) => {
      const spacing =
        typeof props.spacing === 'number' ? props.spacing / 2 : theme.spacing[props.spacing] / 2;

      return {
        display: 'flex',
        flexWrap: props.noWrap ? 'nowrap' : 'wrap',
        justifyContent: JUSTIFY_CONTENT[props.position],
        margin: -1 * spacing,

        '& [data-composable]': {
          margin: spacing,
          flexGrow: props.grow ? 1 : 0,
        },
      };
    },
  }),
  { theming }
);
