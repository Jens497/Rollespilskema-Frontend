
export interface SheetComponentType {
  name: string
  image: string
}

export interface SheetComponent {
  name: string
  pos: {
    x: number
    y: number
  }
}

export function componentTypesToModels(compTypes: SheetComponentType[]) {
  return compTypes.map(compType =>
    ({name: compType.name, pos: { x: 0, y: 0}})
  )
}
