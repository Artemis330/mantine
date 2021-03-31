import React, { useState } from 'react';
import { Modal, Button, ElementsGroup } from '@mantine/core';
import { AuthenticationForm } from '@mantine/demos';
import CodeDemo from '../../../components/CodeDemo/CodeDemo';

const code = `import React, { useState } from 'react';
import { Modal, Button, ElementsGroup } from '@mantine/core';

export function ModalDemo() {
  const [opened, setOpened] = useState(false);
  
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Introduce yourself!"
      >
        <AuthenticationForm noShadow noPadding />
      </Modal>

      <ElementsGroup position="center">
        <Button onClick={() => setOpened(true)}>Open Modal</Button>
      </ElementsGroup>
    </>
  );
}`;

export function ModalBaseDemo() {
  const [opened, setOpened] = useState(false);

  return (
    <CodeDemo code={code} language="tsx">
      <Modal opened={opened} onClose={() => setOpened(false)} title="Introduce yourself!">
        <AuthenticationForm noShadow noPadding />
      </Modal>

      <ElementsGroup position="center">
        <Button onClick={() => setOpened(true)}>Open Modal</Button>
      </ElementsGroup>
    </CodeDemo>
  );
}
