export enum PropertyTypeKinds {
  Boolean = "kind_boolean",
  String = "kind_string",
  Number = "kind_number",
  Array = "kind_array",
  Enum = "kind_enum",
  Object = "kind_object",
}

export type PropertyTypeKindsValues = `${typeof PropertyTypeKinds[keyof typeof PropertyTypeKinds]}`
export const propertyTypeKindsValues = Object.values(PropertyTypeKinds)


export interface BaseSheetComponentProperty<T, K extends PropertyTypeKindsValues = PropertyTypeKindsValues> {
  readonly kind: K extends any ? K : never,
  readonly default: T,
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

type ObjectSheetComponentPropertyFields<T extends SheetComponentPropertyType = SheetComponentPropertyType> = {
  [key: string]: T
}


export interface ObjectSheetComponentProperty<T extends ObjectSheetComponentPropertyFields<SheetComponentPropertyType> = ObjectSheetComponentPropertyFields<SheetComponentPropertyType>>
  extends BaseSheetComponentProperty<T, PropertyTypeKinds.Object> {
}



export type SheetComponentPropertyType =
  | BooleanSheetComponentProperty
  | NumberSheetComponentProperty
  | StringSheetComponentProperty
  | EnumSheetComponentProperty<string | number>
  | ArraySheetComponentProperty<SheetComponentPropertyType>
  | ObjectSheetComponentProperty
  ;


export type WithoutDefault<T extends SheetComponentPropertyType> = T extends any ? Omit<T, "default"> : never;
export type WithValue<T extends SheetComponentPropertyType>
  = T extends ObjectSheetComponentProperty ? ObjectWithValue<T>
  : T extends { kind: PropertyTypeKinds } ? T & { value: TsType<T> }
  : never
  ;
type ObjectWithValue<T extends ObjectSheetComponentProperty> = T & { value: { [key in keyof T["default"]]: WithValue<T["default"][key]> } }
type DefinitionWithValue<T extends { [key: string]: SheetComponentPropertyType }> = T & { [key in keyof T]: WithValue<T[key]> }

type KindToTsTypeInternal<K extends PropertyTypeKindsValues> =
  K extends PropertyTypeKinds.Number ? number
  : K extends PropertyTypeKinds.String ? string
  : K extends PropertyTypeKinds.Array ? unknown[]
  : K extends PropertyTypeKinds.Enum ? { [key: string]: string } | { [key: string]: number }
  : K extends PropertyTypeKinds.Object ? { [key: string]: SheetComponentPropertyType["default"] }
  : never
  ;
export type KindToTsType<K extends PropertyTypeKindsValues> = K extends any ? KindToTsTypeInternal<K> : never;

type PropertyToTsTypeInternal<P extends SheetComponentPropertyType | WithoutDefault<SheetComponentPropertyType>>
  = P extends BaseSheetComponentProperty<infer T, infer _> ? T
  : never;


export type PropertyToTsType<P extends SheetComponentPropertyType | WithoutDefault<SheetComponentPropertyType>> = P extends any ? PropertyToTsTypeInternal<P> : never;

type TsTypeInternal<T extends ElementType<SheetComponentPropertyType> | WithoutDefault<SheetComponentPropertyType>>
  = T extends PropertyTypeKindsValues ? KindToTsType<T>
  : T extends WithoutDefault<SheetComponentPropertyType> ? PropertyToTsType<T>
  : never
  ;
export type TsType<T extends ElementType<SheetComponentPropertyType> | WithoutDefault<SheetComponentPropertyType>> = T extends any ? TsTypeInternal<T> : never;

export type SheetComponentPropertyTypeDefinition = ObjectSheetComponentPropertyFields;

export type SheetComponentProperties<T extends SheetComponentPropertyTypeDefinition> = T extends any ? DefinitionWithValue<T> : never;

export interface SheetComponentType<T extends SheetComponentPropertyTypeDefinition = SheetComponentPropertyTypeDefinition> {
  name: string
  image: string
  propertyTypes: T
}

export interface SheetComponent<T extends SheetComponentPropertyTypeDefinition = SheetComponentPropertyTypeDefinition> {
  name: string
  pos: {
    x: number
    y: number
  }
  properties: SheetComponentProperties<T>
}

export function isSheetComponentProperty(prop: any): prop is SheetComponentPropertyType {
  return typeof prop["kind"] === "string" && propertyTypeKindsValues.some(p => p == prop.kind)
}
export function isSheetComponentProperties(props: any): props is SheetComponentPropertyTypeDefinition {
  return typeof (props) === "object" && Object.keys(props).every(k => typeof k === "string") && Object.values(props).every(isSheetComponentProperty)
}

function setDefaultValue<T extends SheetComponentPropertyType>(component: T): WithValue<T> {
  let _exhaustiveCheck: never;
  switch (component.kind) {
    case PropertyTypeKinds.Boolean:
      return Object.assign({}, component, { value: component.default }) as WithValue<T>
    case PropertyTypeKinds.String:
      return Object.assign({}, component, { value: component.default }) as WithValue<T>
    case PropertyTypeKinds.Number:
      return Object.assign({}, component, { value: component.default }) as WithValue<T>
    case PropertyTypeKinds.Array:
      return Object.assign({}, component, { value: component.default }) as WithValue<T>
    case PropertyTypeKinds.Enum:
      return Object.assign({}, component, { value: component.default }) as WithValue<T>
    case PropertyTypeKinds.Object:
      return Object.assign({}, component, { value: setDefaultValues(component.default) }) as WithValue<T>
    default:
      _exhaustiveCheck = component;
      return _exhaustiveCheck;
  }
}

function setDefaultValues<T extends SheetComponentPropertyTypeDefinition>(definition: T): SheetComponentProperties<T> {
  const properties = Object
    .entries(definition)
    .reduce((acc, [key, value]) => {
      return Object.assign(acc, { [key]: setDefaultValue(value) }) as { [key in keyof T]: WithValue<T[key]> }
    }, {})
  return properties as SheetComponentProperties<T>
}


export function getDefault(componentType: SheetComponentType): SheetComponent {
  const testComponent: SheetComponent<typeof componentType.propertyTypes> = {
    name: componentType.name,
    pos: {
      x: 0,
      y: 0
    },
    properties: setDefaultValues(componentType.propertyTypes)
  };
  return testComponent
}


export function componentTypesToModels(compTypes: SheetComponentType[]): SheetComponent[] {
  return compTypes.map(getDefault)
}
