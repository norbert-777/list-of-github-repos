/**
 * Gets value from the query parameter and returns parsed to number value it's when valid, null otherwise.
 */
export const getPositiveIntegerQueryParameter = (value: string | string[] | undefined): number | null => {
  let valueToUse = value;

  // If value is in array, use the first value
  if (Array.isArray(valueToUse)) {
    valueToUse = valueToUse[0];
  }

  // Check if the value is a string, and it is a probably-positive-number, on false return null
  if (typeof valueToUse !== 'string' || !/^\d+$/.test(valueToUse)) {
    return null;
  }
  const numberValueToUse = Number.parseInt(valueToUse);

  // Filter out NaN and negative numbers
  if (numberValueToUse > 0) {
    return numberValueToUse;
  }

  return null;
};
