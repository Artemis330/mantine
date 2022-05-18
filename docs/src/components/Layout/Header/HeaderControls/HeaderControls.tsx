import React from 'react';
import { Box, Group, useMantineColorScheme, Tooltip } from '@mantine/core';
import { IconTextDirectionRtl, IconTextDirectionLtr, IconSun, IconMoon } from '@tabler/icons';
import { MarkGithubIcon } from '@primer/octicons-react';
import { DiscordIcon } from './DiscordIcon';
import { HeaderControl } from './HeaderControl';
import { SearchControl } from './SearchControl';
import { useDirectionContext } from '../../DirectionContext';

export function HeaderControls() {
  const { dir, toggleDirection } = useDirectionContext();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Box sx={{ position: 'relative' }}>
      <Tooltip.Group openDelay={600} closeDelay={100}>
        <Group pr="md" spacing="xs">
          <SearchControl />

          <HeaderControl
            link="https://discord.gg/eUZpPbpxb4"
            tooltip="Discord"
            variant="discord"
            hideOnMobile
          >
            <DiscordIcon size={20} />
          </HeaderControl>

          <HeaderControl
            link="https://github.com/mantinedev/mantine/"
            tooltip="Source code"
            hideOnMobile
          >
            <MarkGithubIcon size={20} />
          </HeaderControl>

          <HeaderControl
            onClick={toggleDirection}
            tooltip={`${dir === 'ltr' ? 'RTL' : 'LTR'} direction`}
            hideOnMobile
          >
            {dir === 'rtl' ? (
              <IconTextDirectionLtr size={22} />
            ) : (
              <IconTextDirectionRtl size={22} />
            )}
          </HeaderControl>
          <HeaderControl
            onClick={() => toggleColorScheme()}
            tooltip={`${colorScheme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {colorScheme === 'dark' ? <IconSun size={22} /> : <IconMoon size={22} />}
          </HeaderControl>
        </Group>
      </Tooltip.Group>
    </Box>
  );
}
