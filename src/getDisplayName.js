const getDisplayName = (component) =>
  typeof component === 'string'
    ? component
    : component.displayName || component.name || 'Unknown';

export default getDisplayName;
