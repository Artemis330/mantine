import React from 'react';
import { createStyles, Title, Container, Accordion, ThemeIcon, Button } from '@mantine/core';
import { PlusIcon } from '@primer/octicons-react';

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('control');

  return {
    wrapper: {
      paddingTop: theme.spacing.xl * 2,
      minHeight: 820,
      backgroundImage: `linear-gradient(162deg, ${theme.colors.cyan[6]} 0%, ${theme.colors.blue[5]} 100%)`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'top left',
      position: 'relative',
    },

    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.4,
      pointerEvents: 'none',
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.18'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
    },

    title: {
      color: theme.white,
      fontSize: 52,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      marginBottom: theme.spacing.xl * 1.5,
    },

    item: {
      marginTop: theme.spacing.xl,
      backgroundColor: theme.white,
      borderBottom: 0,
      borderRadius: theme.radius.md,
      boxShadow: theme.shadows.lg,
    },

    control: {
      fontSize: theme.fontSizes.lg,
      padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
      color: theme.black,

      '&:hover': {
        backgroundColor: 'transparent',
      },
    },

    content: {
      paddingLeft: theme.spacing.xl,
      lineHeight: 1.6,
      color: theme.black,
    },

    icon: {
      ref: icon,
      marginLeft: theme.spacing.md,
    },

    gradient: {
      backgroundColor: theme.colors.cyan[6],
      backgroundImage: `linear-gradient(45deg, ${theme.colors.cyan[6]} 0%, ${theme.colors.blue[5]} 100%)`,
    },

    itemOpened: {
      [`& .${icon}`]: {
        transform: 'rotate(45deg)',
      },
    },

    button: {
      display: 'block',
      marginTop: theme.spacing.md,

      '@media (max-width: 755px)': {
        display: 'block',
        width: '100%',
      },
    },
  };
});

const placeholder =
  'It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.It was born from sludge on the ocean floor. In a sterile environment, the germs within its body can’t multiply, and it dies.It has no eyeballs, so it can’t see. It checks its surroundings via the ultrasonic waves it emits from its mouth.';

export function FaqWithBg() {
  const { classes, cx } = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.overlay} />

      <Container size="sm">
        <Title align="center" className={classes.title}>
          Frequently Asked Questions
        </Title>

        <Accordion
          iconPosition="right"
          initialItem={0}
          classNames={{
            item: classes.item,
            itemOpened: classes.itemOpened,
            control: classes.control,
            icon: classes.icon,
            contentInner: classes.content,
          }}
          icon={
            <ThemeIcon radius="xl" className={classes.gradient} size={32}>
              <PlusIcon size={18} />
            </ThemeIcon>
          }
        >
          <Accordion.Item label="How can I reset my password?">
            {placeholder}
            <Button className={cx(classes.gradient, classes.button)}>Reset password</Button>
          </Accordion.Item>
          <Accordion.Item label="Can I create more that one account?">{placeholder}</Accordion.Item>
          <Accordion.Item label="Do you store credit card information securely?">
            {placeholder}
          </Accordion.Item>
          <Accordion.Item label="What payment systems to you work with?">
            {placeholder}
          </Accordion.Item>
          <Accordion.Item label="How can I subscribe to monthly newsletter?">
            {placeholder}
            <Button className={cx(classes.gradient, classes.button)}>
              Subscribe to newsletter
            </Button>
          </Accordion.Item>
        </Accordion>
      </Container>
    </div>
  );
}
