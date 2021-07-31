import React from 'react';
import { storiesOf } from '@storybook/react';
import { useSlider } from './use-slider';

const Demo = () => {
  const ref = React.useRef(null);
  const { sliding, value } = useSlider(ref);

  return (
    <div>
      <div style={{ color: sliding ? 'red' : 'green', marginBottom: 10 }}>
        {Math.round(value * 100)}%
      </div>
      <div ref={ref} style={{ position: 'relative', height: 10, backgroundColor: 'red' }}>
        <div
          style={{
            position: 'absolute',
            left: `calc(${value * 100}% - 8px)`,
            top: -3,
            width: 16,
            height: 16,
            backgroundColor: 'blue',
          }}
        />
      </div>
    </div>
  );
};

storiesOf('@mantine/hooks/use-slider', module).add('General usage', () => (
  <div style={{ padding: 40 }}>
    <Demo />
  </div>
));
