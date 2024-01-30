

export function deepClone<T>(o: T): T {
  return JSON.parse(JSON.stringify(o))
}


export function tryOrDefault<T, D>(fn: () => T, defaultValue: D): T | D {
  try {
    return fn()
  } catch (err) {
    console.debug("tryOrDefault: default returned due to exception", err)
    return defaultValue
  }
}
