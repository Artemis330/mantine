import React from 'react';
import { ChevronDown } from 'tabler-icons-react';
import { MultiSelect } from '@mantine/core';
import { data } from './_data';

const code = `
import { MultiSelect } from '@mantine/core';
import { ChevronDown } from 'tabler-icons-react';

function Demo() {
  return (
    <MultiSelect
      data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']}
      label="Your favorite frameworks/libraries"
      placeholder="Pick all that you like"
      rightSection={<ChevronDown size={14} />}
      styles={{ rightSection: { pointerEvents: 'none' } }}
      rightSectionWidth={40}
    />
  );
}
`;

function Demo() {
  return (
    <div style={{ maxWidth: 400, marginLeft: 'auto', marginRight: 'auto' }}>
      <MultiSelect
        data={data}
        label="Your favorite frameworks/libraries"
        placeholder="Pick all that you like"
        rightSection={<ChevronDown size={14} />}
        styles={{ rightSection: { pointerEvents: 'none' } }}
        rightSectionWidth={40}
      />
    </div>
  );
}

export const rightSection: MantineDemo = {
  type: 'demo',
  code,
  component: Demo,
};
