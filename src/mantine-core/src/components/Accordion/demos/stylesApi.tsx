import React from 'react';
import { createUseStyles } from 'react-jss';
import { theming } from '../../../theme';
import { Accordion, AccordionItem, AccordionProps } from '../Accordion';

const code = `
import { createUseStyles } from 'react-jss';
import { Accordion, AccordionItem, AccordionProps, theming } from '@mantine/core';

const useStyles = createUseStyles(
  (theme) => ({
    control: {
      fontSize: theme.fontSizes.lg,
    },

    item: {
      border: \`1px solid \${theme.colors.gray[4]}\`,

      '&:first-of-type': {
        borderTopRightRadius: theme.radius.sm,
        borderTopLeftRadius: theme.radius.sm,
      },

      '&:last-of-type': {
        borderColor: theme.colors.gray[4],
        borderBottomRightRadius: theme.radius.sm,
        borderBottomLeftRadius: theme.radius.sm,
      },

      '& + &': {
        borderTop: 'none',
      },
    },

    itemOpened: {
      '& $control': {
        backgroundColor: theme.colors.blue[0],
        color: theme.colors.blue[9],
      },
    },

    contentInner: {
      paddingTop: theme.spacing.md,
    },
  }),
  { theming }
);

function StyledAccordion(props: AccordionProps) {
  const classes = useStyles();
  return <Accordion classNames={classes} {...props} />;
}

function Demo() {
  return (
    <StyledAccordion>
      <AccordionItem label="Customization">
        Colors, fonts, shadows and many other parts are customizable to fit your design needs
      </AccordionItem>

      <AccordionItem label="Flexibility">
        Configure components appearance and behavior with vast amount of settings or overwrite any
        part of component styles
      </AccordionItem>

      <AccordionItem label="No annoying focus ring">
        With new :focus-visible pseudo-class focus ring appears only when user navigates with
        keyboard
      </AccordionItem>
    </StyledAccordion>
  );
}
`;

const useStyles = createUseStyles(
  (theme) => ({
    control: {
      fontSize: theme.fontSizes.lg,
    },

    item: {
      border: `1px solid ${theme.colors.gray[4]}`,

      '&:first-of-type': {
        borderTopRightRadius: theme.radius.sm,
        borderTopLeftRadius: theme.radius.sm,
      },

      '&:last-of-type': {
        borderColor: theme.colors.gray[4],
        borderBottomRightRadius: theme.radius.sm,
        borderBottomLeftRadius: theme.radius.sm,
      },

      '& + &': {
        borderTop: 'none',
      },
    },

    itemOpened: {
      '& $control': {
        backgroundColor: theme.colors.blue[0],
        color: theme.colors.blue[9],
      },
    },

    contentInner: {
      paddingTop: theme.spacing.md,
    },
  }),
  { theming }
);

function StyledAccordion(props: AccordionProps) {
  const classes = useStyles();
  return <Accordion classNames={classes} {...props} />;
}

function Demo() {
  return (
    <div style={{ maxWidth: 400, marginLeft: 'auto', marginRight: 'auto' }}>
      <StyledAccordion>
        <AccordionItem label="Customization">
          Colors, fonts, shadows and many other parts are customizable to fit your design needs
        </AccordionItem>

        <AccordionItem label="Flexibility">
          Configure components appearance and behavior with vast amount of settings or overwrite any
          part of component styles
        </AccordionItem>

        <AccordionItem label="No annoying focus ring">
          With new :focus-visible pseudo-class focus ring appears only when user navigates with
          keyboard
        </AccordionItem>
      </StyledAccordion>
    </div>
  );
}

export const stylesApi: MantineDemo = {
  type: 'demo',
  code,
  component: Demo,
};
