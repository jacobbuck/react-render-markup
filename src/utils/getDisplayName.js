/**
 * Returns the display name of a react component, element or type
 * @param {*} component - any component or element value
 * @returns {string} - display name or "Unknown"
 */
export const getDisplayName = (component) =>
  typeof component === 'string'
    ? component
    : component.displayName || component.name || 'Unknown';
