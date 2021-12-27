import { CSSObject, MantineMargins, MantineTheme, useCss, useMantineTheme } from '@mantine/styles';

type Sx = CSSObject | ((theme: MantineTheme) => CSSObject);
export type BoxSx = Sx | Sx[];

function extractSx(sx: Sx, theme: MantineTheme) {
  return typeof sx === 'function' ? sx(theme) : sx;
}

function isValidMargin(margin: any) {
  return typeof margin === 'string' || typeof margin === 'number';
}

const MARGINS = {
  m: 'margin',
  mt: 'marginTop',
  mb: 'marginBottom',
  ml: 'marginLeft',
  mr: 'marginRight',
};

function getMargins(margins: MantineMargins, theme: MantineTheme) {
  const styles: CSSObject = {};

  if (isValidMargin(margins.my)) {
    const margin = theme.fn.size({ size: margins.my, sizes: theme.spacing });
    styles.marginTop = margin;
    styles.marginBottom = margin;
  }

  if (isValidMargin(margins.mx)) {
    const margin = theme.fn.size({ size: margins.mx, sizes: theme.spacing });
    styles.marginLeft = margin;
    styles.marginRight = margin;
  }

  Object.keys(MARGINS).forEach((margin) => {
    if (isValidMargin(margins[margin])) {
      styles[MARGINS[margin]] = theme.fn.size({
        size: margins[margin],
        sizes: theme.spacing,
      });
    }
  });

  return styles;
}

export function useSx(sx: BoxSx, margins: MantineMargins, className: string) {
  const theme = useMantineTheme();
  const { css, cx } = useCss();

  if (Array.isArray(sx)) {
    return cx(
      className,
      css(getMargins(margins, theme)),
      sx.map((partial) => css(extractSx(partial, theme)))
    );
  }

  return cx(className, css(extractSx(sx, theme)), css(getMargins(margins, theme)));
}
