import React from 'react';
import { Link } from 'gatsby';
import cx from 'clsx';
import { useMantineTheme, ThemeIcon } from '@mantine/core';
import useStyles from './NavbarMainLink.styles';

interface NavbarMainLinkProps {
  className?: string;
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  color: string;
}

export default function NavbarMainLink({
  to,
  className,
  icon,
  children,
  color,
}: NavbarMainLinkProps) {
  const classes = useStyles({ color, theme: useMantineTheme() });
  return (
    <Link className={cx(classes.mainLink, className)} activeClassName={classes.active} to={to}>
      <ThemeIcon color={color} variant="light">
        {icon}
      </ThemeIcon>
      <div className={classes.body}>{children}</div>
    </Link>
  );
}
