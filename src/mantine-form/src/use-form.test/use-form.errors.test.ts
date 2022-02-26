import { act, renderHook } from '@testing-library/react-hooks';
import { useForm } from '../index';

describe('@mantine/form/use-form errors', () => {
  it('sets initial errors based on input', () => {
    const hook = renderHook(() =>
      useForm({
        initialValues: { orange: 'fruit', banana: true, apple: 20 },
        initialErrors: { orange: 'orange-error', banana: 55, apple: null },
      })
    );

    expect(hook.result.current.errors).toStrictEqual({
      orange: 'orange-error',
      banana: 55,
      apple: null,
    });
  });

  it('sets errors to empty object if initial errors are not defined', () => {
    const hook = renderHook(() =>
      useForm({ initialValues: { orange: 'fruit', banana: true, apple: 20 } })
    );

    expect(hook.result.current.errors).toStrictEqual({});
  });

  it('sets error with setFieldError handler', () => {
    const hook = renderHook(() =>
      useForm({ initialValues: { orange: 'fruit', banana: true, apple: 20 } })
    );

    act(() => hook.result.current.setFieldError('banana', 'banana-error'));
    expect(hook.result.current.errors).toStrictEqual({ banana: 'banana-error' });

    act(() => hook.result.current.setFieldError('apple', 'apple-error'));
    expect(hook.result.current.errors).toStrictEqual({
      banana: 'banana-error',
      apple: 'apple-error',
    });
  });

  it('sets errors with setErrors handler', () => {
    const hook = renderHook(() =>
      useForm({ initialValues: { orange: 'fruit', banana: true, apple: 20 } })
    );

    act(() => hook.result.current.setErrors({ apple: 'apple-error', orange: 'orange-error' }));
    expect(hook.result.current.errors).toStrictEqual({
      apple: 'apple-error',
      orange: 'orange-error',
    });
  });

  it('clears field error with clearFieldError handler', () => {
    const hook = renderHook(() =>
      useForm({
        initialValues: { orange: 'fruit', banana: true, apple: 20 },
        initialErrors: { orange: 'orange-error', banana: 'banana-error' },
      })
    );

    act(() => hook.result.current.clearFieldError('orange'));
    expect(hook.result.current.errors).toStrictEqual({ banana: 'banana-error' });

    act(() => hook.result.current.clearFieldError('banana'));
    expect(hook.result.current.errors).toStrictEqual({});
  });

  it('ignore error clear if error does not exist', () => {
    const hook = renderHook(() =>
      useForm({
        initialValues: { orange: 'fruit', banana: true, apple: 20 },
        initialErrors: { orange: 'orange-error', banana: 'banana-error' },
      })
    );

    act(() => hook.result.current.clearFieldError('apple'));
    expect(hook.result.current.errors).toStrictEqual({
      orange: 'orange-error',
      banana: 'banana-error',
    });
  });

  it('clears all errors with clearErrors handler', () => {
    const hook = renderHook(() =>
      useForm({
        initialValues: { orange: 'fruit', banana: true, apple: 20 },
        initialErrors: { orange: 'orange-error', banana: 'banana-error' },
      })
    );

    act(() => hook.result.current.clearErrors());
    expect(hook.result.current.errors).toStrictEqual({});
  });
});
