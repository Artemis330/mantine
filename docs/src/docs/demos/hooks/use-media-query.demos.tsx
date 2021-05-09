import React from 'react';
import { Group, Button } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import CodeDemo from '../../../components/CodeDemo/CodeDemo';

const code = `import React from 'react';
import { Button } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export function Demo() {
  const matches = useMediaQuery('(min-width: 900px)');

  return (
    <Button color={matches ? 'teal' : 'red'}>
      Breakpoint {matches ? 'matches' : 'does not match'}
    </Button>
  );
}`;

export function UseBreakpointDemo() {
  const matches = useMediaQuery('(min-width: 900px)');

  return (
    <CodeDemo code={code} language="tsx">
      <Group position="center">
        <Button color={matches ? 'teal' : 'red'}>
          Breakpoint {matches ? 'matches' : 'does not match'}
        </Button>
      </Group>
    </CodeDemo>
  );
}
