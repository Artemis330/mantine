import React from 'react';
import { Anchor } from './Anchor';

export default { title: 'Anchor' };

export function CustomComponent() {
  return (
    <div style={{ padding: 40 }}>
      <Anchor component="button" type="button">
        Anchor as button
      </Anchor>

      <br />

      <Anchor component="span">Anchor as span</Anchor>
    </div>
  );
}

export function WithTextProps() {
  return (
    <div style={{ padding: 40 }}>
      <Anchor size="lg" weight={700} color="red">
        Text props
      </Anchor>
    </div>
  );
}
