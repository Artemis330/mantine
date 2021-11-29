import React, { useState, forwardRef } from 'react';
import { storiesOf } from '@storybook/react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Select } from '../Select';
import { Button } from '../../Button';
import { Group } from '../../Group';

const data = [
  { value: 'react', label: 'React' },
  { value: 'ng', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'vue', label: 'Vue' },
];

const groupedData = [
  { value: 'react', label: 'React', disabled: true, group: 'FB' },
  { value: 'ng', label: 'Angular', group: 'Google' },
  { value: 'lit', label: 'Lit', group: 'Google' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'vue', label: 'Vue', group: 'Evan' },
];

const stringData = ['React', 'Angular', 'Svelte', 'Vue'];

const largeData = Array(50)
  .fill(0)
  .map((_, index) => ({
    value: `${index}`,
    label: `Item ${index}`,
  }));

const CustomScrollbars = forwardRef<any, any>((props: any, ref: any) => (
  <Scrollbars
    {...props}
    style={{ ...props.style, height: 300 }}
    ref={(scrollbars: any) => scrollbars?.view && ref(scrollbars.view)}
  >
    <div style={{ padding: 3 }}>{props.children}</div>
  </Scrollbars>
));

function Controlled({ clearable = false }: { clearable?: boolean }) {
  const [value, setValue] = useState(null);

  return (
    <div>
      <Select
        clearable={clearable}
        label="Controlled"
        placeholder="Controlled"
        value={value}
        onChange={setValue}
        data={data}
        style={{ marginTop: 20 }}
      />
      <Group mt="md">
        <Button variant="outline" onClick={() => setValue(null)}>
          Set null
        </Button>
        <Button variant="outline" onClick={() => setValue('react')}>
          Set value
        </Button>
      </Group>
    </div>
  );
}

function Creatable() {
  const [creatableData, setData] = useState(stringData);

  return (
    <Select
      label="Creatable Select"
      data={creatableData}
      placeholder="Select items"
      nothingFound="Nothing found"
      searchable
      creatable
      onCreate={(query) => setData((c) => [...c, query])}
      getCreateLabel={(query) => `+ Create ${query}`}
    />
  );
}

storiesOf('@mantine/core/Select/stories', module)
  .add('Controlled', () => (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <Controlled />
    </div>
  ))
  .add('Fixed value', () => (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <Select
        label="Controlled (fixed value)"
        placeholder="Choose value"
        searchable
        value="ng"
        data={data}
        style={{ marginTop: 20 }}
      />
    </div>
  ))
  .add('Disabled items', () => (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <Select
        label="Disabled Elements"
        placeholder="Choose value"
        data={[...data, { value: 'lit', label: 'Lit', disabled: true }]}
        style={{ marginTop: 20 }}
      />
    </div>
  ))
  .add('Grouped data', () => (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <Select
        label="With Grouped and Disabled Data"
        placeholder="Choose value"
        data={groupedData}
        style={{ marginTop: 20 }}
        searchable
      />
    </div>
  ))
  .add('With custom scrollbars', () => (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <Select
        data={largeData}
        label="custom scrollbars"
        placeholder="select with custom scrollbars"
        dropdownComponent={CustomScrollbars}
      />
    </div>
  ))
  .add('Creatable', () => (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <Creatable />
    </div>
  ))
  .add('String as data', () => (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <Select
        label="Choose your favorite library/framework"
        placeholder="Choose value"
        data={stringData}
      />
    </div>
  ))
  .add('Searchable without nothing found', () => (
    <div style={{ padding: 40, maxWidth: 400 }}>
      <Select
        label="Choose your favorite library/framework"
        placeholder="Choose value"
        data={stringData}
        searchable
      />
    </div>
  ));
