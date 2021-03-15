import React from 'react';
import cx from 'clsx';
import { DefaultProps, useMantineTheme } from '@mantine/theme';
import { TabProps } from '../Tab/Tab';
import useStyles from './TabControl.styles';

interface TabControlProps extends DefaultProps, React.ComponentPropsWithoutRef<'button'> {
  active: boolean;
  elementRef(node: HTMLButtonElement): void;
  tabProps: TabProps;
  color?: string;
}

export function TabControl({
  themeOverride,
  active,
  elementRef,
  tabProps,
  color,
  ...others
}: TabControlProps) {
  const { label, icon, color: overrideColor, ...props } = tabProps;
  const classes = useStyles({
    color: overrideColor || color,
    theme: useMantineTheme(themeOverride),
  });

  return (
    <button
      {...others}
      {...props}
      data-mantine-tab
      tabIndex={active ? 0 : -1}
      className={cx(classes.tab, { [classes.tabActive]: active })}
      type="button"
      role="tab"
      aria-selected={active}
      ref={elementRef}
    >
      <div className={classes.tabInner}>
        {icon && (
          <div data-mantine-icon className={classes.tabIcon}>
            {icon}
          </div>
        )}
        {label && <div data-mantine-label>{label}</div>}
      </div>
    </button>
  );
}

TabControl.displayName = '@mantine/core/TabControl';
