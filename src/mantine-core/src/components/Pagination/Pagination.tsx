import React from 'react';
import cx from 'clsx';
import { usePagination } from '@mantine/hooks';
import { Group } from '../Group/Group';
import {
  DefaultProps,
  mergeStyles,
  useMantineTheme,
  MantineNumberSize,
  getSizeValue,
} from '../../theme';
import useStyles from './Pagination.styles';
import { DefaultItem, PaginationItemProps } from './DefaultItem/DefaultItem';

export type { PaginationItemProps } from './DefaultItem/DefaultItem';

export type PaginationStylesNames = keyof ReturnType<typeof useStyles>;

export interface PaginationProps
  extends DefaultProps<PaginationStylesNames>,
    Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'> {
  /** Change item component */
  itemComponent?: React.FC<PaginationItemProps>;

  /** Active item color from theme, defaults to theme.primaryColor */
  color?: string;

  /** Active initial page for uncontrolled component */
  initialPage?: number;

  /** Controlled active page number */
  page?: number;

  /** Total amount of pages */
  total: number;

  /** Siblings amount on left/right side of selected page */
  siblings?: number;

  /** Amount of elements visible on left/right edges */
  boundary?: number;

  /** Callback fired after change of each page */
  onChange?: (page: number) => void;

  /** Callback to control aria-labels */
  getItemAriaLabel?: (page: number | 'dots' | 'prev' | 'next') => string | undefined;

  /** Spacing between items from theme or number to set value in px, defaults to theme.spacing.xs / 2 */
  spacing?: MantineNumberSize;

  /** Predefined item size or number to set value in px */
  size?: MantineNumberSize;
}

export function Pagination({
  itemComponent: Item = DefaultItem,
  className,
  classNames,
  styles,
  themeOverride,
  page,
  initialPage = 1,
  color,
  total,
  siblings = 1,
  boundary = 1,
  size = 'xs',
  onChange,
  getItemAriaLabel,
  spacing,
  ...others
}: PaginationProps) {
  const theme = useMantineTheme(themeOverride);
  const classes = useStyles({ theme, color, size }, classNames, 'pagination');
  const _styles = mergeStyles(classes, styles);

  const { paginationRange, goToPage, goNextPage, goPrevPage, activePage } = usePagination({
    page,
    siblings,
    total,
    onChange,
    initialPage,
    boundary,
  });

  const items = paginationRange.map((pageNumber, index) => (
    <Item
      key={index}
      page={pageNumber}
      active={pageNumber === activePage}
      aria-label={typeof getItemAriaLabel === 'function' ? getItemAriaLabel(pageNumber) : null}
      style={{
        ..._styles.item,
        ...(pageNumber === activePage ? _styles.active : null),
        ...(pageNumber === 'dots' ? _styles.dots : null),
      }}
      className={cx(classes.item, {
        [classes.active]: pageNumber === activePage,
        [classes.dots]: pageNumber === 'dots',
      })}
      onClick={pageNumber !== 'dots' ? () => goToPage(pageNumber) : undefined}
    />
  ));

  return (
    <Group spacing={spacing || getSizeValue({ size, sizes: theme.spacing }) / 2} {...others}>
      <Item
        page="prev"
        onClick={goPrevPage}
        aria-label={getItemAriaLabel ? getItemAriaLabel('prev') : undefined}
        aria-disabled={activePage === 1}
        style={_styles.item}
        className={classes.item}
        disabled={activePage === 1}
      />

      {items}

      <Item
        page="next"
        onClick={goNextPage}
        aria-label={getItemAriaLabel ? getItemAriaLabel('next') : undefined}
        aria-disabled={activePage === total}
        style={_styles.item}
        className={classes.item}
        disabled={activePage === total}
      />
    </Group>
  );
}

Pagination.displayName = '@mantine/core/Pagination';
