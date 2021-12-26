import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { checkAccessibility, itRendersChildren, itSupportsSystemProps } from '@mantine/tests';
import { Text } from '../Text/Text';
import { Alert, AlertProps } from './Alert';

const defaultProps: AlertProps = {
  title: 'test-title',
  children: 'test-alert',
  icon: '$',
  withCloseButton: true,
};

describe('@mantine/core/Alert', () => {
  itRendersChildren(Alert, defaultProps);
  itSupportsSystemProps({
    component: Alert,
    props: defaultProps,
    displayName: '@mantine/core/Alert',
    refType: HTMLDivElement,
  });

  checkAccessibility([
    render(
      <Alert title="Error happened" color="red">
        <Text>Something bad happened</Text>
      </Alert>
    ),
    render(
      <Alert color="red">
        <Text>Something bad happened</Text>
      </Alert>
    ),
  ]);

  it('renders close button based on withCloseButton prop', () => {
    const { container: withCloseButton } = render(<Alert {...defaultProps} withCloseButton />);
    const { container: withoutCloseButton } = render(
      <Alert {...defaultProps} withCloseButton={false} />
    );

    expect(withCloseButton.querySelector('.mantine-Alert-closeButton')).toBeInTheDocument();
    expect(withoutCloseButton.querySelectorAll('.mantine-Alert-closeButton')).toHaveLength(0);
  });

  it('calls onClose when CloseButton is clicked', () => {
    const spy = jest.fn();
    render(
      <Alert title="test" withCloseButton onClose={spy}>
        test
      </Alert>
    );

    userEvent.click(screen.getByRole('button'));
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('renders given title', () => {
    render(<Alert title="test-title">test-alert</Alert>);
    expect(screen.getByText('test-title')).toBeInTheDocument();
  });

  it('does not render title if title prop was not passed', () => {
    const { container } = render(<Alert>test-alert</Alert>);
    expect(container.querySelectorAll('.mantine-Alert-title')).toHaveLength(0);
  });
});
