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
  | EnumSheetComponentProperty<string | number>
  | ArraySheetComponentProperty<SheetComponentPropertyType>
  | ObjectSheetComponentProperty
  ;


//#region ComponentProperty implementations
export interface BaseSheetComponentProperty<T, K extends PropertyTypeKindsValues = PropertyTypeKindsValues> {
  readonly kind: K extends any ? K : never,
  readonly defaultValue: T,
}

export interface BooleanSheetComponentProperty extends BaseSheetComponentProperty<boolean, PropertyTypeKinds.Boolean> { }
export interface NumberSheetComponentProperty extends BaseSheetComponentProperty<number, PropertyTypeKinds.Number> { }
export interface StringSheetComponentProperty extends BaseSheetComponentProperty<string, PropertyTypeKinds.String> { }

export interface EnumSheetComponentProperty<T extends number | string, K extends string = string, V extends { [key in K]: T extends any ? T : never } = { [key in K]: T }>
  extends BaseSheetComponentProperty<V[keyof V], PropertyTypeKinds.Enum> {
  values: V,
}

type ElementType<T extends SheetComponentPropertyType> =
  T extends any
  ? keyof Omit<T, "default" | "kind"> extends never
  ? T["kind"]
  : WithoutDefault<T>
  : never;

export interface ArraySheetComponentProperty<T extends SheetComponentPropertyType> extends BaseSheetComponentProperty<PropertyToTsType<T>[], PropertyTypeKinds.Array> {
  elementType: ElementType<T>,
}

export type ObjectSheetComponentPropertyFields<T extends SheetComponentPropertyType = SheetComponentPropertyType> = {
  [key: string]: T
}

export interface ObjectSheetComponentProperty<T extends ObjectSheetComponentPropertyFields<SheetComponentPropertyType> = ObjectSheetComponentPropertyFields<SheetComponentPropertyType>>
  extends BaseSheetComponentProperty<T, PropertyTypeKinds.Object> {
}
//#endregion

//#region Helper Types
export type WithoutDefault<T extends SheetComponentPropertyType> = T extends any ? Omit<T, "default"> : never;
export type WithValue<T extends SheetComponentPropertyType>
  = T extends ObjectSheetComponentProperty ? ObjectWithValue<T>
  : T extends { kind: PropertyTypeKinds } ? T & { value: T["defaultValue"] }
  : never
  ;
type ObjectWithValue<T extends ObjectSheetComponentProperty> = T & { value: { [key in keyof T["defaultValue"]]: WithValue<T["defaultValue"][key]> } }
type DefinitionWithValue<T extends { [key: string]: SheetComponentPropertyType }> = T & { [key in keyof T]: WithValue<T[key]> }


type PropertyToTsTypeInternal<P extends SheetComponentPropertyType | WithoutDefault<SheetComponentPropertyType>>
  = P extends BaseSheetComponentProperty<infer T, infer _> ? T
  : never;
type PropertyToTsType<P extends SheetComponentPropertyType | WithoutDefault<SheetComponentPropertyType>> = P extends any ? PropertyToTsTypeInternal<P> : never;


type PropertyTranslationInternal<T extends SheetComponentPropertyType>
  = T extends ObjectSheetComponentProperty<infer F> ? PropertyFieldTranslation<F>
  : never
  ;
type PropertyFieldTranslationInternal<T extends { [key: string]: SheetComponentPropertyType }>
  = { [key in keyof T]: string }
  & { [key in keyof T & string as `_${PropertyTranslationInternal<T[key]> extends never ? never : key}`]: PropertyTranslationInternal<T[key]> };
export type PropertyFieldTranslation<T extends { [key: string]: SheetComponentPropertyType }> = T extends any ? PropertyFieldTranslationInternal<T> : never;
//#endregion

export type SheetComponentPropertyTypeDefinition = ObjectSheetComponentPropertyFields;
export type SheetComponentProperties<T extends SheetComponentPropertyTypeDefinition> = T extends any ? DefinitionWithValue<T> : never;


