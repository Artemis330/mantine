import React, { forwardRef } from 'react';
import { DefaultProps, ClassNames, useContextStylesApi } from '@mantine/styles';
import { Box } from '../../Box';
import { useTabsContext } from '../Tabs.context';
import useStyles from './TabsList.styles';

export type TabsListStylesNames = ClassNames<typeof useStyles>;

export interface TabsListProps extends DefaultProps, React.ComponentPropsWithoutRef<'div'> {
  /** <Tabs.Tab /> components */
  children: React.ReactNode;

  /** Determines whether tabs should take the whole space */
  grow?: boolean;
}

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ children, className, grow = false, ...others }, ref) => {
    const { orientation, variant, unstyled, color } = useTabsContext();
    const { classNames, styles } = useContextStylesApi();
    const { classes, cx } = useStyles(
      { orientation, grow, variant, color },
      { name: 'Tabs', unstyled, classNames, styles }
    );

    return (
      <Box
        {...others}
        className={cx(classes.tabsList, className)}
        ref={ref}
        role="tablist"
        aria-orientation={orientation}
      >
        {children}
      </Box>
    );
  }
);

TabsList.displayName = '@mantine/core/TabsList';
