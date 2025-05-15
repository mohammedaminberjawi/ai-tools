/**
 * Calculates the median value of a numeric array.
 * If the array is empty, returns undefined.
 * If the array has an odd number of elements, returns the middle value.
 * If the array has an even number of elements, returns the average of the two middle values.
 *
 * @param numbers - An array of numbers
 * @returns The median value or undefined if the array is empty
 */
export function median(numbers: number[]): number | undefined {
  if (numbers.length === 0) {
    return undefined;
  }

  const sorted = [...numbers].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  } else {
    return sorted[middle];
  }
}
