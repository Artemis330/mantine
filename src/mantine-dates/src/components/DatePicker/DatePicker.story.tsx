import React from 'react';
import { storiesOf } from '@storybook/react';
import { DatePicker } from './DatePicker';

storiesOf('@mantine/dates/DatePicker', module).add('Uncontrolled', () => (
  <div style={{ padding: 40 }}>
    <DatePicker placeholder="Pick date" />
  </div>
));
