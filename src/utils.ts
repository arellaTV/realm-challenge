/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-this-alias, @typescript-eslint/no-unsafe-function-type */
export function debounce<T extends Function>(fn: T, delay: number): (...args: any[]) => void {
  let timeoutId: ReturnType<typeof setTimeout>
  return function (this: any, ...args: any[]) {
    const context = this
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      fn.apply(context, args)
    }, delay)
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-this-alias, @typescript-eslint/no-unsafe-function-type */

/** This is just a placeholder implementation as an example. No need to mess with this. */
export function adjustProbability(probability: number, description: string) {
  const minProbability = description.includes('easy') ? 60 : 0
  const maxProbability = description.includes('hard') ? 40 : 100
  return Math.max(minProbability, Math.min(maxProbability, probability))
}
