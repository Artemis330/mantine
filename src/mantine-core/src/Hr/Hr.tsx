import React from 'react';
import cx from 'clsx';
import { useMantineTheme, DefaultProps } from '@mantine/theme';
import useStyles from './Hr.styles';

interface HrProps extends DefaultProps, React.ComponentPropsWithoutRef<'hr'> {
  variant?: 'solid' | 'dashed' | 'dotted';
}

export default function Hr({ className, variant = 'dashed', style, ...others }: HrProps) {
  const classes = useStyles({ theme: useMantineTheme() });

  return (
    <hr
      className={cx(classes.hr, className)}
      style={{ ...style, borderTopStyle: variant }}
      {...others}
    />
  );
}

Hr.displayName = '@mantine/core/Hr';
