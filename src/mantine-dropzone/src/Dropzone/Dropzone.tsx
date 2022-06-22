import React, { forwardRef, useEffect } from 'react';
import { useDropzone, FileRejection, Accept } from 'react-dropzone';
import {
  DefaultProps,
  Selectors,
  MantineNumberSize,
  LoadingOverlay,
  Box,
  useComponentDefaultProps,
} from '@mantine/core';
import { assignRef, useDisclosure } from '@mantine/hooks';
import { ForwardRefWithStaticComponents } from '@mantine/utils';
import { DropzoneProvider } from './Dropzone.context';
import { DropzoneAccept, DropzoneIdle, DropzoneReject } from './DropzoneStatus';
import useStyles from './Dropzone.styles';
import useFullScreenStyles from './DropzoneFullScreen.styles';

export type DropzoneStylesNames = Selectors<typeof useStyles>;
export type DropzoneFullScreenStylesName =
  | DropzoneStylesNames
  | Exclude<Selectors<typeof useFullScreenStyles>, 'dropzone'>;

export interface DropzoneStatus {
  accepted: boolean;
  rejected: boolean;
}

export interface DropzoneProps
  extends DefaultProps<DropzoneStylesNames>,
    Omit<React.ComponentPropsWithRef<'div'>, 'onDrop'> {
  /** Padding from theme.spacing, or number to set padding in px */
  padding?: MantineNumberSize;

  /** Border radius from theme.radius or number to set border-radius in px */
  radius?: MantineNumberSize;

  /** Dropzone statues */
  children: React.ReactNode;

  /** Disable files capturing */
  disabled?: boolean;

  /** Called when files are dropped into dropzone */
  onDrop(files: File[]): void;

  /** Called when selected files don't meet file restrictions */
  onReject?(fileRejections: FileRejection[]): void;

  /** Display loading overlay over dropzone */
  loading?: boolean;

  /** File types to accept  */
  accept?: Accept | string[];

  /** Get open function as ref */
  openRef?: React.ForwardedRef<() => void | undefined>;

  /** Allow selection of multiple files */
  multiple?: boolean;

  /** Set maximum file size in bytes */
  maxSize?: number;

  /** Name of the form control. Submitted with the form as part of a name/value pair. */
  name?: string;

  /** Number of files that user can pick */
  maxFiles?: number;

  /** Set to true to autofocus the root element */
  autoFocus?: boolean;

  /** If false, disables click to open the native file selection dialog */
  activateOnClick?: boolean;

  /** If false, disables drag 'n' drop */
  activateOnDrag?: boolean;

  /** If false, disables Space/Enter to open the native file selection dialog. Note that it also stops tracking the focus state. */
  activateOnKeyboard?: boolean;

  /** If false, stops drag event propagation to parents */
  dragEventsBubbling?: boolean;

  /** Called when the `dragenter` event occurs */
  onDragEnter?(event: React.DragEvent<HTMLElement>): void;

  /** Called when the `dragleave` event occurs */
  onDragLeave?(event: React.DragEvent<HTMLElement>): void;

  /** Called when the `dragover` event occurs */
  onDragOver?(event: React.DragEvent<HTMLElement>): void;

  /** Called when user closes the file selection dialog with no selection */
  onFileDialogCancel?(): void;

  /** Called when user opens the file selection dialog */
  onFileDialogOpen?(): void;

  /** If false, allow dropped items to take over the current browser window */
  preventDropOnDocument?: boolean;
}

const defaultProps: Partial<DropzoneProps> = {
  padding: 'md',
  loading: false,
  multiple: true,
  maxSize: Infinity,
  autoFocus: false,
  activateOnClick: true,
  activateOnDrag: true,
  dragEventsBubbling: true,
  activateOnKeyboard: true,
};

const _Dropzone: any = forwardRef<HTMLDivElement, DropzoneProps>((props: DropzoneProps, ref) => {
  const {
    className,
    padding,
    radius,
    disabled,
    classNames,
    styles,
    loading,
    multiple,
    maxSize,
    accept,
    children,
    onDrop,
    onReject,
    openRef,
    name,
    unstyled,
    maxFiles,
    autoFocus,
    activateOnClick,
    activateOnDrag,
    dragEventsBubbling,
    activateOnKeyboard,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onFileDialogCancel,
    onFileDialogOpen,
    preventDropOnDocument,
    ...others
  } = useComponentDefaultProps('Dropzone', defaultProps, props);

  const { classes, cx } = useStyles(
    { radius, padding },
    { classNames, styles, unstyled, name: 'Dropzone' }
  );

  const { getRootProps, getInputProps, isDragAccept, isDragReject, open } = useDropzone({
    onDropAccepted: onDrop,
    onDropRejected: onReject,
    disabled: disabled || loading,
    accept: Array.isArray(accept) ? accept.reduce((r, key) => ({ ...r, [key]: [] }), {}) : accept,
    multiple,
    maxSize,
    maxFiles,
    autoFocus,
    noClick: !activateOnClick,
    noDrag: !activateOnDrag,
    noDragEventsBubbling: !dragEventsBubbling,
    noKeyboard: !activateOnKeyboard,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onFileDialogCancel,
    onFileDialogOpen,
    preventDropOnDocument,
  });

  assignRef(openRef, open);

  const isIdle = !isDragAccept && !isDragReject;

  return (
    <DropzoneProvider value={{ accept: isDragAccept, reject: isDragReject, idle: isIdle }}>
      <Box
        {...others}
        {...getRootProps({ ref })}
        data-accept={isDragAccept || undefined}
        data-reject={isDragReject || undefined}
        data-idle={isIdle || undefined}
        data-loading={loading || undefined}
        className={cx(classes.root, className)}
      >
        <LoadingOverlay visible={loading} radius={radius} unstyled={unstyled} />
        <input {...getInputProps()} name={name} />
        <div className={classes.inner}>{children}</div>
      </Box>
    </DropzoneProvider>
  );
});

export interface DropzoneFullScreenProps
  extends Omit<DropzoneProps, 'styles' | 'classNames'>,
    DefaultProps<DropzoneFullScreenStylesName> {
  active?: boolean;
}

const fullScreenDefaultProps: Partial<DropzoneFullScreenProps> = {
  ...defaultProps,
  active: true,
};

const DropzoneFullScreen = forwardRef<HTMLDivElement, DropzoneFullScreenProps>((props, ref) => {
  const {
    classNames,
    styles,
    sx,
    className,
    style,
    unstyled,
    active,
    onDrop,
    onReject,
    ...others
  } = useComponentDefaultProps('DropzoneFullScreen', fullScreenDefaultProps, props);

  const [visible, { open, close }] = useDisclosure(false);
  const { classes, cx } = useFullScreenStyles(null, {
    name: 'FullScreenDropzone',
    classNames,
    styles,
    unstyled,
  });

  useEffect(() => {
    if (active) {
      document.addEventListener('dragover', open, false);
      document.addEventListener('dragleave', close, false);
      document.addEventListener('drop', close, false);

      return () => {
        document.removeEventListener('dragover', open, false);
        document.removeEventListener('dragleave', close, false);
        document.removeEventListener('drop', close, false);
      };
    }

    return undefined;
  }, [active]);

  return (
    <Box
      className={cx(classes.wrapper, className)}
      sx={sx}
      style={{ ...style, opacity: visible ? 1 : 0, pointerEvents: visible ? 'all' : 'none' }}
    >
      <_Dropzone
        {...others}
        classNames={classNames}
        styles={styles}
        unstyled={unstyled}
        ref={ref}
        className={classes.dropzone}
        onDrop={(files: any) => {
          onDrop?.(files);
          close();
        }}
        onReject={(files: any) => {
          onReject?.(files);
          close();
        }}
      />
    </Box>
  );
});

_Dropzone.displayName = '@mantine/dropzone/Dropzone';
_Dropzone.Accept = DropzoneAccept;
_Dropzone.Reject = DropzoneReject;
_Dropzone.Idle = DropzoneIdle;
_Dropzone.FullScreen = DropzoneFullScreen;

export const Dropzone: ForwardRefWithStaticComponents<
  DropzoneProps,
  {
    Accept: typeof DropzoneAccept;
    Reject: typeof DropzoneReject;
    Idle: typeof DropzoneIdle;
    FullScreen: typeof DropzoneFullScreen;
  }
> = _Dropzone;
