export enum SimplePropertyTypes {
  String = "string",
  Number = "number"
}

export enum ComplexPropertyTypes {
  Array = "array",
  Enum = "enum",
  Object = "object",
}

export interface SheetComponentProperty<T, K = SimplePropertyTypes | ComplexPropertyTypes> {
  readonly kind: K,
  default: T
}

export interface EnumSheetComponentProperty<T extends number | string, K extends string = string, V extends {[key in K]: T extends number ? number : string} = {[key in K]: T extends number ? number : string}>
 extends SheetComponentProperty<K, ComplexPropertyTypes.Enum> {
  values: V
}

type ElementType<T extends SheetComponentProperty<unknown>> = keyof Omit<T, "default" | "kind"> extends never
  ? T["kind"]
  : Omit<T, "default">;

type ObjectSheetComponentPropertyFields = {
  [key: string]: SheetComponentProperty<unknown>
}

type ObjectSheetComponentPropertyDefault<T extends ObjectSheetComponentPropertyFields> = {
  [key in keyof T]: T[key]["default"]
}

export interface ObjectSheetComponentProperty<T extends ObjectSheetComponentPropertyFields>
extends SheetComponentProperty<ObjectSheetComponentPropertyDefault<T>, ComplexPropertyTypes.Object> {
  fields: { [key in keyof T]: Omit<T[key], "default"> }
}



export interface ArraySheetComponentProperty<T extends SheetComponentProperty<unknown>> extends SheetComponentProperty<TsType<T>[], ComplexPropertyTypes.Array> {
  elementType: ElementType<T>,
}


type TsType<P extends SheetComponentProperty<unknown> | ObjectSheetComponentPropertyFields | unknown> =
  P extends NumberSheetComponentProperty ? number
  : P extends StringSheetComponentProperty ? string
  : P extends EnumSheetComponentProperty<infer _> ? P["values"]
  : P extends ObjectSheetComponentProperty<infer F> ? TsType<F>
  : P extends ArraySheetComponentProperty<infer E> ? TsType<E>[]
  : P
  ;



export type NumberSheetComponentProperty = SheetComponentProperty<number, SimplePropertyTypes.Number>
type StringSheetComponentProperty = SheetComponentProperty<string, SimplePropertyTypes.String>




export interface SheetComponentType {
  name: string
  image: string
  properties: Record<string, unknown> // TODO figure out how to handle types for specific components
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
