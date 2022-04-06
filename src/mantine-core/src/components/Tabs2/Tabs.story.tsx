import React, { useState } from 'react';
import { Package } from 'tabler-icons-react';
import { Tabs, TabsProps } from './Tabs';
import { Badge } from '../Badge';
import { Box } from '../Box';

export default {
  title: 'Tabs2',
};

const base = (
  <>
    <Tabs.List>
      <Tabs.Tab value="react">React</Tabs.Tab>
      <Tabs.Tab value="sv">Svelte</Tabs.Tab>
      <Tabs.Tab value="ng">Wrapped tab</Tabs.Tab>
      <Tabs.Tab value="ds" disabled>
        Disabled
      </Tabs.Tab>
    </Tabs.List>

    <Tabs.Panel value="react" pr="sm">
      React Panel
    </Tabs.Panel>
    <Tabs.Panel value="sv" pr="sm">
      Svelte Panel
    </Tabs.Panel>
    <Tabs.Panel value="ng" pr="sm">
      Angular Panel
    </Tabs.Panel>
  </>
);

const verticalBase = (
  <>
    <Tabs.List>
      <Tabs.Tab value="react">React</Tabs.Tab>
      <Tabs.Tab value="sv">Svelte</Tabs.Tab>
      <Tabs.Tab value="ng">Wrapped tab</Tabs.Tab>
      <Tabs.Tab value="ds" disabled>
        Disabled
      </Tabs.Tab>
    </Tabs.List>

    <Tabs.Panel value="react" pl="sm">
      React Panel
    </Tabs.Panel>
    <Tabs.Panel value="sv" pl="sm">
      Svelte Panel
    </Tabs.Panel>
    <Tabs.Panel value="ng" pl="sm">
      Angular Panel
    </Tabs.Panel>
  </>
);

const Wrapper = (props: TabsProps) => <Tabs sx={{ maxWidth: 500 }} mx="auto" mt={40} {...props} />;

export const NoLoop = () => (
  <Wrapper defaultValue="react" loop={false}>
    {base}
  </Wrapper>
);

export const NoKeyboardActivation = () => (
  <Wrapper defaultValue="react" activateTabWithKeyboardEvents={false}>
    {base}
  </Wrapper>
);

export const NoDefaultValue = () => <Wrapper defaultValue={null}>{base}</Wrapper>;

export const AllowDeactivation = () => (
  <Wrapper defaultValue="react" allowTabDeactivation>
    {base}
  </Wrapper>
);

export const Controlled = () => {
  const [tab, setTab] = useState('react');
  return (
    <Wrapper value={tab} onTabChange={setTab} allowTabDeactivation>
      {base}
    </Wrapper>
  );
};

export const Grow = () => (
  <Wrapper defaultValue="react">
    <Tabs.List grow>
      <Tabs.Tab value="react">React</Tabs.Tab>
      <Tabs.Tab value="sv">Svelte</Tabs.Tab>
      <Tabs.Tab value="ng">Wrapped tab</Tabs.Tab>
      <Tabs.Tab value="ds" disabled>
        Disabled
      </Tabs.Tab>
    </Tabs.List>

    <Tabs.Panel value="react">React Panel</Tabs.Panel>
    <Tabs.Panel value="sv">Svelte Panel</Tabs.Panel>
    <Tabs.Panel value="ng">Angular Panel</Tabs.Panel>
  </Wrapper>
);

export const Variants = () => (
  <Box sx={{ maxWidth: 400 }} mx="auto" mt={40}>
    <Wrapper defaultValue="react" variant="default" mt={10} mb={50}>
      {base}
    </Wrapper>

    <Wrapper defaultValue="react" variant="outline" mt={10} mb={50}>
      {base}
    </Wrapper>

    <Wrapper defaultValue="react" variant="pills" mt={10}>
      {base}
    </Wrapper>
  </Box>
);

export const VerticalVariants = () => (
  <Box sx={{ maxWidth: 400 }} mx="auto" mt={40}>
    <Wrapper defaultValue="react" orientation="vertical" variant="default" mt={10} mb={50}>
      {verticalBase}
    </Wrapper>

    <Wrapper defaultValue="react" orientation="vertical" variant="outline" mt={10} mb={50}>
      {verticalBase}
    </Wrapper>

    <Wrapper defaultValue="react" orientation="vertical" variant="pills" mt={10}>
      {verticalBase}
    </Wrapper>
  </Box>
);

export const WithIcon = () => (
  <Wrapper defaultValue="react" variant="outline">
    <Tabs.List>
      <Tabs.Tab value="react" icon={<Package size={14} />}>
        React
      </Tabs.Tab>
      <Tabs.Tab
        value="sv"
        rightSection={
          <Badge size="xs" sx={{ width: 16, height: 16, padding: 0 }}>
            6
          </Badge>
        }
      >
        Svelte
      </Tabs.Tab>
      <Tabs.Tab value="ng">Angular</Tabs.Tab>
      <Tabs.Tab value="ds" disabled>
        Disabled
      </Tabs.Tab>
    </Tabs.List>

    <Tabs.Panel value="react" pt="sm">
      React Panel
    </Tabs.Panel>
    <Tabs.Panel value="sv" pt="sm">
      Svelte Panel
    </Tabs.Panel>
    <Tabs.Panel value="ng" pt="sm">
      Angular Panel
    </Tabs.Panel>
  </Wrapper>
);
