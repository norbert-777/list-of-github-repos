/**
 * Gets value from the query parameter and returns string value it's when valid, null otherwise.
 */
export const getStringQueryParameter = (value: string | string[] | undefined): string | null => {
  let valueToUse = value;

  // If value is in array, use the first value
  if (Array.isArray(valueToUse)) {
    valueToUse = valueToUse[0];
  }

  // Check if the value is a string, on false return fallback value
  if (typeof valueToUse !== 'string') {
    return null;
  }

  return valueToUse;
};
