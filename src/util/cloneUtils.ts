

export function deepClone<T>(o: T): T {
  return JSON.parse(JSON.stringify(o))
}
