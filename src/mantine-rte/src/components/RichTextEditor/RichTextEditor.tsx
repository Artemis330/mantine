import React, { useMemo } from 'react';
import cx from 'clsx';
import Editor, { Quill } from 'react-quill';
import { useMantineTheme, DefaultProps } from '@mantine/core';
import { Toolbar } from '../Toolbar/Toolbar';
import { ALL_CONTROLS } from './default-control';
import useStyles from './RichTextEditor.styles';
import { DEFAULT_LABELS, RichTextEditorLabels } from './default-labels';
import { createImageBlot, ImageUploader } from '../../modules/image-uploader';
import { replaceIcons } from '../../modules/icons';
// import './lib.css';

export type { RichTextEditorLabels };

const InlineBlot = Quill.import('blots/block');
const ImageBlot = createImageBlot(InlineBlot);
Quill.register({ 'formats/imageBlot': ImageBlot });
Quill.register('modules/imageUploader', ImageUploader);

const icons = Quill.import('ui/icons');
replaceIcons(icons);

export interface RichTextEditorProps extends DefaultProps {
  value: string;
  onChange(value: string): void;
  onImageUpload?(image: File): Promise<string>;
  labels?: RichTextEditorLabels;
}

export function RichTextEditor({
  value,
  onChange,
  onImageUpload = () => Promise.resolve(null),
  labels = DEFAULT_LABELS,
  themeOverride,
  className,
  ...others
}: RichTextEditorProps) {
  const theme = useMantineTheme(themeOverride);
  const classes = useStyles({ theme }, null, 'rte');

  const modules = useMemo(
    () => ({
      toolbar: { container: '#toolbar' },
      imageUploader: {
        upload: (file: File) => onImageUpload(file),
      },
    }),
    []
  );

  return (
    <div className={cx(classes.root, className)} {...others}>
      <Toolbar controls={ALL_CONTROLS} themeOverride={themeOverride} labels={labels} />
      <Editor theme="snow" modules={modules} value={value} onChange={onChange} />
    </div>
  );
}
