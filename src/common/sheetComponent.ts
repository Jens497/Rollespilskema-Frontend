export enum PropertyTypeKinds {
  Boolean = "kind_boolean",
  String = "kind_string",
  Number = "kind_number",
  Array = "kind_array",
  Enum = "kind_enum",
  Object = "kind_object",
}

export type PropertyTypeKindsValues = `${typeof PropertyTypeKinds[keyof typeof PropertyTypeKinds]}`
export const propertyTypeKindsValues: PropertyTypeKindsValues[] = Object.values(PropertyTypeKinds)

export type SheetComponentPropertyType =
  | BooleanSheetComponentProperty
  | NumberSheetComponentProperty
  | StringSheetComponentProperty
  | EnumSheetComponentProperty
  | ArraySheetComponentProperty<SheetComponentPropertyType>
  | ObjectSheetComponentProperty
  ;

//#region ComponentProperty implementations
export interface BaseSheetComponentProperty<T, K extends PropertyTypeKindsValues = PropertyTypeKindsValues> {
  readonly kind: K extends any ? K : never,
  defaultValue: T,
}

export interface BooleanSheetComponentProperty extends BaseSheetComponentProperty<boolean, PropertyTypeKinds.Boolean> { }
export interface NumberSheetComponentProperty extends BaseSheetComponentProperty<number, PropertyTypeKinds.Number> { }
export interface StringSheetComponentProperty extends BaseSheetComponentProperty<string, PropertyTypeKinds.String> { }


export interface EnumSheetComponentProperty<T extends { [key in keyof T]: number } | { [key in keyof T]: string } = { [key: string]: number } | { [key: string]: string }>
  extends BaseSheetComponentProperty<T[keyof T], PropertyTypeKinds.Enum> {
  values: T,
}


export interface ArraySheetComponentProperty<T extends SheetComponentPropertyType> extends BaseSheetComponentProperty<PropertyToTsType<T>[], PropertyTypeKinds.Array> {
  elementType: T,
}

export type ObjectSheetComponentPropertyFields<T extends SheetComponentPropertyType = SheetComponentPropertyType> = {
  [key: string]: T
}

export interface ObjectSheetComponentProperty<T extends ObjectSheetComponentPropertyFields<SheetComponentPropertyType> = ObjectSheetComponentPropertyFields<SheetComponentPropertyType>>
  extends BaseSheetComponentProperty<T, PropertyTypeKinds.Object> {
}
//#endregion

//#region Helper Types
export type WithoutDefault<T extends SheetComponentPropertyType> = T extends any ? Omit<T, "defaultValue"> : never;
export type WithValue<T extends SheetComponentPropertyType>
  = T extends ObjectSheetComponentProperty ? ObjectWithValue<T>
  : T extends { kind: PropertyTypeKinds } ? T & { value: T["defaultValue"] }
  : never
  ;
type ObjectWithValue<T extends ObjectSheetComponentProperty> = T & { value: { [key in keyof T["defaultValue"]]: WithValue<T["defaultValue"][key]> } }
export type DefinitionWithValue<T extends { [key: string]: SheetComponentPropertyType }> = T & { [key in keyof T]: WithValue<T[key]> }

type KindToTsTypeInternal<K>
  = K extends PropertyTypeKinds.String ? string
  : K extends PropertyTypeKinds.Number ? number
  : K extends PropertyTypeKinds.Enum ? Record<string, string> | Record<string, number>
  : K extends PropertyTypeKinds.Array ? unknown[]
  : K extends PropertyTypeKinds.Object ? Record<string, SheetComponentPropertyType>
  : never
  ;
type KindToTsType<K> = K extends any ? KindToTsTypeInternal<K> : never;
type PropertyToTsTypeInternal<P extends SheetComponentPropertyType | WithoutDefault<SheetComponentPropertyType>>
  = P extends BaseSheetComponentProperty<infer T, infer K> ? unknown extends T ? KindToTsType<K> : T : never;
type PropertyToTsType<P extends SheetComponentPropertyType | WithoutDefault<SheetComponentPropertyType>> = P extends any ? PropertyToTsTypeInternal<P> : never;

type PropertyTranslationInternal<T extends SheetComponentPropertyType>
  = T extends ObjectSheetComponentProperty<infer F> ? PropertyFieldTranslation<F>
  : never
  ;
type PropertyFieldTranslationInternal<T extends { [key: string]: SheetComponentPropertyType }>
  = { [key in keyof T]: string }
  & { [key in keyof T & string as `_${PropertyTranslationInternal<T[key]> extends never ? never : key}`]: PropertyTranslationInternal<T[key]> };
export type PropertyFieldTranslation<T extends { [key: string]: SheetComponentPropertyType }> = T extends any ? PropertyFieldTranslationInternal<T> : never;

export type PartialProperty<T extends SheetComponentPropertyType> =
  T extends ObjectSheetComponentProperty<infer F>
  ? { kind: PropertyTypeKinds.Object, defaultValue: PartialPropertyDefinition<F> }
  : T;
export type PartialPropertyDefinition<T extends ObjectSheetComponentPropertyFields> = T extends any ? { [key in keyof T]?: PartialProperty<T[key]> } : never
//#endregion

//#region defineProperty functions
export function numberProperty(defaultValue: number = 0): NumberSheetComponentProperty {
  return {
    kind: PropertyTypeKinds.Number,
    defaultValue
  }
}

export function stringProperty(defaultValue: string = ""): StringSheetComponentProperty {
  return {
    kind: PropertyTypeKinds.String,
    defaultValue
  }
}

export function booleanProperty(defaultValue: boolean = false): BooleanSheetComponentProperty {
  return {
    kind: PropertyTypeKinds.Boolean,
    defaultValue
  }
}

export function enumProperty<const T extends { [key in keyof T]: T[key] }>(
  values: T,
  defaultValue: T[keyof T] = Object.values(values)[0] as T[keyof T]
): EnumSheetComponentProperty<T> {
  return {
    kind: PropertyTypeKinds.Enum,
    values,
    defaultValue
  }
}

export function arrayProperty<T extends SheetComponentPropertyType>
  (
    elementType: T,
    defaultValue: PropertyToTsType<T>[] = []
  ): ArraySheetComponentProperty<T> {
  return {
    kind: PropertyTypeKinds.Array,
    elementType,
    defaultValue: defaultValue
  }
}

export function objectProperty<const T extends { [key in keyof T]: T[key] }>(defaultValue: T): ObjectSheetComponentProperty<T> {
  return {
    kind: PropertyTypeKinds.Object,
    defaultValue
  }
}
//#endregion
