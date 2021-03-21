import { createUseStyles } from 'react-jss';
import {
  MantineTheme,
  getSizeValue,
  MantineNumberSize,
  getFontStyles,
  getThemeColor,
} from '@mantine/theme';

const sizes = {
  xs: 16,
  sm: 26,
  md: 38,
  lg: 56,
  xl: 84,
};

interface AvatarStylesProps {
  size: MantineNumberSize;
  radius: MantineNumberSize;
  theme: MantineTheme;
  color: string;
}

export default createUseStyles({
  avatar: ({ size, radius, theme }: AvatarStylesProps) => ({
    boxSizing: 'border-box',
    position: 'relative',
    userSelect: 'none',
    overflow: 'hidden',
    width: getSizeValue({ size, sizes }),
    height: getSizeValue({ size, sizes }),
    borderRadius: radius ? getSizeValue({ size: radius, sizes: theme.radius }) : size,
  }),

  image: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },

  placeholder: ({ theme, size, color }: AvatarStylesProps) => ({
    ...getFontStyles(theme),
    fontSize: getSizeValue({ size, sizes }) / 2.5,
    color: getThemeColor({ theme, color, shade: 5 }),
    fontWeight: 700,
    backgroundColor: getThemeColor({ theme, color, shade: 1 }),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  }),

  placeholderIcon: ({ theme, color }: AvatarStylesProps) => ({
    width: '70%',
    height: '70%',
    color: getThemeColor({ theme, color, shade: 6 }),
  }),
});
