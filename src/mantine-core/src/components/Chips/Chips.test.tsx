import React from 'react';
import { shallow } from 'enzyme';
import { itSupportsClassName, itSupportsOthers, itSupportsStyle } from '@mantine/tests';
import { Chips } from './Chips';
import { Chip } from './Chip/Chip';

const defaultProps = {
  children: [<Chip>test-1</Chip>, <Chip>test-2</Chip>, <Chip>test-3</Chip>],
};

describe('@mantine/core/Chips', () => {
  itSupportsClassName(Chips, defaultProps);
  itSupportsOthers(Chips, defaultProps);
  itSupportsStyle(Chips, defaultProps);

  it('sets chip type based on multiple prop', () => {
    const multiple = shallow(<Chips multiple {...defaultProps} />);
    const single = shallow(<Chips multiple={false} {...defaultProps} />);

    expect(multiple.find(Chip).at(0).prop('type')).toBe('checkbox');
    expect(single.find(Chip).at(0).prop('type')).toBe('radio');
  });

  it('provides static name and id to Chip based on id prop', () => {
    const element = shallow(<Chips id="test-id" {...defaultProps} />);
    const chip = element.find(Chip).at(1);
    expect(chip.prop('id')).toBe('test-id-1');
    expect(chip.prop('name')).toBe('test-id');
  });

  it('has correct displayName', () => {
    expect(Chips.displayName).toEqual('@mantine/core/Chips');
  });
});
