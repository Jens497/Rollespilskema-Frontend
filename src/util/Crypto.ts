import { rand } from '@vueuse/core'
import * as cryptography from 'crypto'


export function randomUUID(): `${string}-${string}-${string}-${string}-${string}` {
  if (crypto.randomUUID != undefined) {
    return crypto.randomUUID()
  } else if (cryptography.randomUUID != undefined) {
    return cryptography.randomUUID()
  } else {
    const getDigit = () => rand(0, 15).toString(16)
    const getPart = () => new Array(8).fill(undefined).map(getDigit).join('')
    const getUUID = () => new Array(5).fill(undefined).map(getPart).join('-') as `${string}-${string}-${string}-${string}-${string}`
    return getUUID()
  }
}


