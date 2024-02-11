

export const validators = {
  required: (value?: string) => value != undefined && value.trim().length > 0 || "required",
  requireLength: (minLength: number) => (value?: string) => value != undefined && value.trim().length >= minLength || `requireLength: ${minLength}`,
  requireDigit: (value?: string) => value != undefined && /[0-9]/.test(value) || "requireDigit",
  requireLowercase: (value?: string) => value != undefined && /[a-zæøå]/.test(value) || "requireLowercase",
  requireUppercase: (value?: string) => value != undefined && /[A-ZÆØÅ]/.test(value) || "requireUppercase",
  requireNonAlphanumeric: (value?: string) => value != undefined && /(~[0-9a-zæøåA-ZÆØÅ])/.test(value) || "requireNonAlphanumeric",
  requirePattern: (pattern: RegExp, onError: string | false = false) => (value?: string) => value != undefined && pattern.test(value) || onError,
  requireEqual: (expected: string, onError: string | false = false) => (value?: string) => expected == value || onError
}
