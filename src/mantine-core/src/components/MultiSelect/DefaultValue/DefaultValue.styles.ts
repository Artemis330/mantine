import {
  createMemoStyles,
  getSizeValue,
  MantineNumberSize,
  MantineSize,
  MantineTheme,
} from '../../../theme';

interface DefaultLabelStyles {
  theme: MantineTheme;
  size: MantineSize;
  radius: MantineNumberSize;
  disabled: boolean;
}

const sizes = {
  xs: 16,
  sm: 22,
  md: 26,
  lg: 30,
  xl: 36,
};

const fontSizes = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
};

export default createMemoStyles({
  defaultValue: ({ theme, size, disabled, radius }: DefaultLabelStyles) => ({
    display: 'flex',
    alignItems: 'center',
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors[theme.primaryColor][1],
    color:
      theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors[theme.primaryColor][9],
    lineHeight: 1,
    height: getSizeValue({ size, sizes }),
    paddingLeft: getSizeValue({ size, sizes: theme.spacing }),
    paddingRight: disabled ? getSizeValue({ size, sizes: theme.spacing }) : 0,
    fontWeight: 500,
    fontSize: getSizeValue({ size, sizes: fontSizes }),
    borderRadius: getSizeValue({ size: radius, sizes: theme.radius }),
    cursor: disabled ? 'not-allowed' : 'default',
    userSelect: 'none',
  }),

  defaultValueRemove: ({ theme, size }: DefaultLabelStyles) => ({
    color:
      theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors[theme.primaryColor][9],
    marginLeft: getSizeValue({ size, sizes: theme.spacing }) / 6,
  }),
});
