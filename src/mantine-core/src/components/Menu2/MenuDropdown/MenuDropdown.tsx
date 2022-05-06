/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useRef } from 'react';
import { DefaultProps } from '@mantine/styles';
import { Popover } from '../../Popover';

export interface MenuDropdownProps extends DefaultProps, React.ComponentPropsWithoutRef<'div'> {
  /** Item label */
  children?: React.ReactNode;
}

export function MenuDropdown({ children, ...others }: MenuDropdownProps) {
  const wrapperRef = useRef<HTMLDivElement>();
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      wrapperRef.current.querySelectorAll<HTMLButtonElement>('[data-menu-item]')[0].focus();
    }
  };

  return (
    <Popover.Dropdown p={4} {...others}>
      <div
        tabIndex={-1}
        data-menu-dropdown
        data-autofocus
        onKeyDown={handleKeyDown}
        ref={wrapperRef}
        style={{ outline: 0 }}
      >
        {children}
      </div>
    </Popover.Dropdown>
  );
}

MenuDropdown.displayName = '@mantine/core/MenuDropdown';
