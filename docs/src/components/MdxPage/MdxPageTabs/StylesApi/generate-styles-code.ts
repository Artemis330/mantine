export function generateStylesCode(names: string[], component: string) {
  const classNames = names.reduce((acc, name) => `${acc}\n    ${name}: { color: 'red' },`, '');
  return `<${component}
  styles={{${classNames}
  }}
/>`;
}

export function generateClassNamesCode(names: string[], component: string) {
  const classNames = names.reduce((acc, name) => `${acc}\n    ${name}: 'your-${name}-class'`, '');
  return `<${component}
  classNames={{${classNames}
  }}
/>`;
}
