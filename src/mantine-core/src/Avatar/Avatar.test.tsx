import React from 'react';
import {
  shallow,
  mount,
  checkAccessibility,
  itSupportsClassName,
  itSupportsOthers,
  itSupportsStyle,
} from '@mantine/tests';
import { Avatar } from './Avatar';

const img =
  'https://avatars0.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4';

describe('@mantine/core/Avatar', () => {
  checkAccessibility([mount(<Avatar src={img} alt="It's me!" />)]);
  itSupportsClassName(Avatar, { src: img });
  itSupportsOthers(Avatar, { src: img });
  itSupportsStyle(Avatar, { src: img });

  it('has correct displayName', () => {
    expect(Avatar.displayName).toEqual('@mantine/core/Avatar');
  });

  it('passes src and alt to image', () => {
    const element = shallow(<Avatar src={img} alt="test-alt" />)
      .render()
      .find('img');
    expect(element.attr('src')).toBe(img);
    expect(element.attr('alt')).toBe('test-alt');
  });

  it('renders placeholder if src was not provided', () => {
    const element = shallow(<Avatar src={null} />);
    expect(element.render().find('[data-mantine-placeholder]')).toHaveLength(1);
  });
});
