import oc from 'open-color';
import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '../Button/Button';
import { ElementsGroup } from '../ElementsGroup/ElementsGroup';
import { LoadingOverlay } from './LoadingOverlay';

function LoadingOverlayDemo(props?: any) {
  const [visible, setVisible] = useState(false);

  return (
    <div style={{ width: 400, padding: 20 }}>
      <div style={{ width: 400, height: 500, backgroundColor: oc.blue[3], position: 'relative' }}>
        <LoadingOverlay visible={visible} {...props} />
      </div>

      <ElementsGroup position="center" style={{ marginTop: 30 }}>
        <Button onClick={() => setVisible((v) => !v)}>Toggle overlay</Button>
      </ElementsGroup>
    </div>
  );
}

storiesOf('@mantine/core/LoadingOverlay', module)
  .add('General usage', () => <LoadingOverlayDemo />)
  .add('Custom Loader props', () => (
    <LoadingOverlayDemo loaderProps={{ size: 'lg', color: 'grape' }} />
  ))
  .add('Custom Overlay props', () => (
    <LoadingOverlayDemo overlayOpacity={0.6} overlayColor="red" />
  ));
