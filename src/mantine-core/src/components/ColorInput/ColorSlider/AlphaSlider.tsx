import React from 'react';
import { ColorSlider } from './ColorSlider';

export interface AlphaSliderProps {
  value: number;
  onChange(value: number): void;
  'aria-label'?: string;
  color: string;
}

export function AlphaSlider({ value, onChange, 'aria-label': ariaLabel, color }: AlphaSliderProps) {
  return (
    <ColorSlider
      value={value}
      onChange={onChange}
      maxValue={1}
      label={ariaLabel}
      shouldRound={false}
      overlays={[
        {
          backgroundImage:
            'linear-gradient(45deg, #eee 25%, transparent 25%), linear-gradient(-45deg, #eee 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #eee 75%), linear-gradient(-45deg, #fff 75%, #eee 75%)',
          backgroundSize: '8px 8px',
          backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px',
        },
        {
          backgroundImage: `linear-gradient(90deg, transparent, ${color})`,
        },
        {
          boxShadow: 'rgba(0, 0, 0, .1) 0px 0px 0px 1px inset, rgb(0, 0, 0, .15) 0px 0px 4px inset',
        },
      ]}
    />
  );
}

AlphaSlider.displayName = '@mantine/core/AlphaSlider';
