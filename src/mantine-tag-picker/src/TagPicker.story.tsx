import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { nanoid } from 'nanoid';
import { OPEN_COLOR_THEMES } from '@mantine/types';
import oc from 'open-color';
import TagPicker from './TagPickerContainer';
import { TagPickerTag } from './types';

type TagPickerWrapperProps = Omit<
  React.ComponentProps<typeof TagPicker>,
  | 'value'
  | 'onChange'
  | 'data'
  | 'colors'
  | 'description'
  | 'createLabel'
  | 'onTagCreate'
  | 'onTagDelete'
  | 'onTagUpdate'
>;

const defaultData: TagPickerTag[] = [
  { id: '1', name: 'Pets', color: oc.indigo[0] },
  { id: '2', name: 'Home', color: oc.red[0] },
  { id: '3', name: 'Subscriptions', color: oc.teal[0] },
];

function TagPickerWrapper(props: TagPickerWrapperProps) {
  const [value, onChange] = useState<TagPickerTag>(null);
  const [data, setData] = useState(defaultData);

  return (
    <TagPicker
      value={value}
      onChange={onChange}
      data={data}
      colors={OPEN_COLOR_THEMES.map((theme) => ({ name: theme, color: oc[theme][0] }))}
      description="Select category or create new"
      createLabel="+ Create new category"
      onTagCreate={(values) => setData((current) => [...current, { ...values, id: nanoid() }])}
      onTagDelete={(id) => setData((current) => current.filter((item) => item.id !== id))}
      onTagUpdate={(id, values) =>
        setData((current) => {
          const copy = [...current];
          const index = current.findIndex((item) => item.id === id);
          copy[index] = { id, ...values };
          return copy;
        })
      }
      {...props}
    />
  );
}

storiesOf('@mantine/tag-picker/TagPicker', module).add('General Usage', () => <TagPickerWrapper />);
