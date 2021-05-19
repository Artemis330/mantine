import React from 'react';
import { Tooltip, Button, Group } from '@mantine/core';
import CodeDemo from '../../../../components/CodeDemo/CodeDemo';

const code = `import React from 'react';
import { Tooltip, Button } from '@mantine/core';

function Demo() {
  return (
    <Tooltip data-mantine-composable label="Ctrl + J" delay={500}>
      <Button variant="outline">Toggle color scheme</Button>
    </Tooltip>
  );
}`;

export function TooltipDelayDemo() {
  return (
    <CodeDemo code={code} language="tsx">
      <Group position="center">
        <Tooltip data-mantine-composable label="Ctrl + J" delay={500}>
          <Button variant="outline">Toggle color scheme</Button>
        </Tooltip>
      </Group>
    </CodeDemo>
  );
}
