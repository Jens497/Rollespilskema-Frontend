

export function deepClone<T>(o: T): T {
  return JSON.parse(JSON.stringify(o))
}


export function tryOrDefault<T, D>(fn: () => T, defaultValue: D, options?: { logOnDefault?: boolean }): T | D {
  try {
    return fn()
  } catch (err) {
    if (options?.logOnDefault) {
      console.debug("tryOrDefault: default returned due to exception", err)
    }
    return defaultValue
  }
}
