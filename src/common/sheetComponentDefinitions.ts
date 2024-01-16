import imgUrl from '@/assets/logo.png';
import { properties as labelProperties } from "@/common/sheetComponentProperties/Label"
import LabelComponent from "@/components/templateEditor/sheet-components/LabelComponent.vue"
import { DefineComponent } from 'vue';
import { PropertyTypeKinds, SheetComponentProperties, SheetComponentPropertyType, SheetComponentPropertyTypeDefinition, WithValue, propertyTypeKindsValues } from './sheetComponent';


export interface SheetComponentType<T extends SheetComponentPropertyTypeDefinition = SheetComponentPropertyTypeDefinition> {
  name: keyof ComponentTypeFieldsMap
  image: string
  propertyTypes: T
  vueComponent?: DefineComponent<unknown, unknown, any>
}

export interface SheetComponent<T extends SheetComponentPropertyTypeDefinition = SheetComponentPropertyTypeDefinition> {
  name: keyof ComponentTypeFieldsMap
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


// TODO add The component to each template (and to SheetComponentType)
export const COMPONENT_TYPE_MAP = {
  "Box": {
    image: imgUrl,
    propertyTypes: {},
    vueComponent: undefined
  },
  "Label": {
    image: imgUrl,
    propertyTypes: labelProperties,
    vueComponent: LabelComponent
  },
  "Text Input": {
    image: imgUrl,
    propertyTypes: {},
    vueComponent: undefined
  },
  "Line": {
    image: imgUrl,
    propertyTypes: {},
    vueComponent: undefined
  },
  "Image": {
    image: imgUrl,
    propertyTypes: {},
    vueComponent: undefined
  },
  "Info Circle": {
    image: imgUrl,
    propertyTypes: {},
    vueComponent: undefined
  },
} as const


export const COMPONENT_TYPES: SheetComponentType[] = Object.entries(COMPONENT_TYPE_MAP).map(([k, v]) => ({ ...v, name: k as keyof ComponentTypeFieldsMap }))

export type ComponentTypeFieldsMap = typeof COMPONENT_TYPE_MAP
export type ComponentTypeFieldsList = typeof COMPONENT_TYPES

export function vueComponentOf(component: SheetComponent): DefineComponent<unknown, unknown, any> | undefined {
  const vueComponent = COMPONENT_TYPE_MAP[component.name].vueComponent
  return vueComponent
}
