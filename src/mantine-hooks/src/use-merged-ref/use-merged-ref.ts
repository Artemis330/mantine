import React from 'react';

export function useMergedRef<T>(...refs: React.ForwardedRef<T>[]) {
  return (node: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(node);
      } else {
        // eslint-disable-next-line no-param-reassign
        ref.current = node;
      }
    });
  };
}
