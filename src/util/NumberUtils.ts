
/**
 *  Compare two numbers for equality within a margin of error
 * @param n1 First number to compare
 * @param n2 Second number to compare
 * @param margin The precision of the comparison  -  defaults to 1/1000'th the absolute value of the lowest non-zero number
 * @returns True if the values are within the margin of error of each other
 */
export function approxEqual(n1: number, n2: number, margin?: number): boolean {
  if (margin == undefined) {
    const lowestNonZeroN = n1 == 0 || n2 == 0 ? Math.max(Math.abs(n1), Math.abs(n2)) : Math.min(Math.abs(n1), Math.abs(n2))
    margin = lowestNonZeroN / 1000
  }

  return Math.abs(n1 - n2) <= Math.abs(margin)
}
