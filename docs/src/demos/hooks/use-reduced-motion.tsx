import React from 'react';
import { Group, Badge } from '@mantine/core';
import { useReducedMotion } from '@mantine/hooks';

const code = `import React from 'react';
import { Badge } from '@mantine/core';
import { useReducedMotion } from '@mantine/hooks';

export function Demo() {
  const reduceMotion = useReducedMotion();

  return (
    <Badge
      color={reduceMotion ? 'red' : 'teal'}
      style={{ transitionDuration: reduceMotion ? '0ms' : '200ms' }}
      variant="filled"
    >
      {reduceMotion ? 'You prefer to reduce motion' : 'You prefer not to reduce motion'}
    </Badge>
  );
}`;

function Demo() {
  const reduceMotion = useReducedMotion();
  return (
    <Group position="center">
      <Badge
        color={reduceMotion ? 'red' : 'teal'}
        style={{ transitionDuration: reduceMotion ? '0ms' : '200ms' }}
        variant="filled"
      >
        {reduceMotion ? 'You prefer to reduce motion' : 'You prefer not to reduce motion'}
      </Badge>
    </Group>
  );
}

export const useReducedMotionHook: MantineDemo = {
  type: 'demo',
  code,
  component: Demo,
};
