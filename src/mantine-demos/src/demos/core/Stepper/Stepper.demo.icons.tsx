import React, { useState } from 'react';
import { IconUserCheck, IconMailOpened, IconShieldCheck, IconCircleCheck } from '@tabler/icons';
import { Stepper } from '@mantine/core';

const code = `
import { useState } from 'react';
import { IconUserCheck, IconMailOpened, IconShieldCheck, IconCircleCheck } from '@tabler/icons';
import { Stepper } from '@mantine/core';

function Demo() {
  const [active, setActive] = useState(1);

  return (
    <Stepper active={active} onStepClick={setActive} completedIcon={<IconCircleCheck />}>
      <Stepper.Step icon={<IconUserCheck size={18} />} label="Step 1" description="Create an account" />
      <Stepper.Step icon={<IconMailOpened size={18} />} label="Step 2" description="Verify email" />
      <Stepper.Step icon={<IconShieldCheck size={18} />} label="Step 3" description="Get full access" />
    </Stepper>
  );
}
`;

function Demo() {
  const [active, setActive] = useState(1);
  return (
    <Stepper
      active={active}
      onStepClick={setActive}
      completedIcon={<IconCircleCheck />}
      breakpoint="sm"
    >
      <Stepper.Step
        icon={<IconUserCheck size={18} />}
        label="Step 1"
        description="Create an account"
      />
      <Stepper.Step icon={<IconMailOpened size={18} />} label="Step 2" description="Verify email" />
      <Stepper.Step
        icon={<IconShieldCheck size={18} />}
        label="Step 3"
        description="Get full access"
      />
    </Stepper>
  );
}

export const icons: MantineDemo = {
  type: 'demo',
  component: Demo,
  code,
};
