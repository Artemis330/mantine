import { createUseStyles } from 'react-jss';
import { MantineTheme, MantineNumberSize, getSizeValue, getFontStyles } from '@mantine/theme';

interface ImageStylesProps {
  theme: MantineTheme;
  radius: MantineNumberSize;
}

export default createUseStyles({
  wrapper: {
    position: 'relative',
  },

  image: ({ theme, radius }: ImageStylesProps) => ({
    ...getFontStyles(theme),
    width: '100%',
    height: '100%',
    borderRadius: getSizeValue({ size: radius, sizes: theme.radius }),
    border: 0,
  }),

  placeholderIcon: ({ theme, radius }: ImageStylesProps) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    color: theme.colors.gray[6],
    backgroundColor: theme.colors.gray[0],
    position: 'absolute',
    borderRadius: getSizeValue({ size: radius, sizes: theme.radius }),
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }),
});
