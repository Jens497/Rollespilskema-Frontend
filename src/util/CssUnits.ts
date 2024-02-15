
type Px = `${number}px`

export function px(n: number): Px {
  return `${n}px`
}

export function addPx(n1: number | Px, n2: number | Px): Px {
  const num1 = typeof n1 == 'number' ? n1 : Number.parseFloat(n1.replace('px', ''))
  const num2 = typeof n2 == 'number' ? n2 : Number.parseFloat(n2.replace('px', ''))

  return `${num1 + num2}px`
}
