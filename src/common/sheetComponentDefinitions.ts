import imgUrl from '@/assets/logo.png';
import { type Properties as DefaultProperties, properties as defaultProperties } from "@/common/sheetComponentProperties/Default"
import { properties as labelProperties } from "@/common/sheetComponentProperties/Label"
import LabelComponent from "@/components/templateEditor/sheet-components/LabelComponent.vue"
import { properties as boxProperties } from "@/common/sheetComponentProperties/Box"
import BoxComponent from "@/components/templateEditor/sheet-components/BoxComponent.vue"
import { DefineComponent } from 'vue';
import { PropertyTypeKinds, SheetComponentProperties, SheetComponentPropertyType, SheetComponentPropertyTypeDefinition, WithValue } from './sheetComponent';


export interface SheetComponentType<T extends SheetComponentPropertyTypeDefinition = SheetComponentPropertyTypeDefinition> {
  readonly name: keyof ComponentTypeFieldsMap
  image: string
  readonly propertyTypes: T
  vueComponent?: DefineComponent<unknown, unknown, any>
}

export interface SheetComponent<T extends SheetComponentPropertyTypeDefinition = SheetComponentPropertyTypeDefinition> {
  name: keyof ComponentTypeFieldsMap
  properties: SheetComponentProperties<T & DefaultProperties>
}

export const COMPONENT_TYPE_MAP = {
  "Box": {
    image: imgUrl,
    propertyTypes: boxProperties,
    vueComponent: BoxComponent
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

//#region default value helper functions
function mergeObjectSheetComponentDefaults<T extends SheetComponentPropertyTypeDefinition, D extends SheetComponentPropertyTypeDefinition>(defaults: D, definition: T): T & D {
  const definitionWithDefault: SheetComponentPropertyTypeDefinition = { ...defaults }
  for (const key in definition) {
    const definitionValue = definition[key]
    const defaultValue = defaults[key]
    const definitionWithDefaultValue = definitionWithDefault[key]
    switch (definitionWithDefaultValue?.kind) {
      case undefined:
        definitionWithDefault[key] = definition[key];
        break;
      case PropertyTypeKinds.Object:
        if (definitionValue.kind != defaultValue.kind || definitionValue.kind != definitionWithDefaultValue.kind) {
          throw new Error("Incompatible kinds", { cause: { key, definitionValue, defaultValue } })
        }

        try {
          const merged = mergeObjectSheetComponentDefaults(definitionWithDefaultValue.defaultValue, definitionValue.defaultValue)
          definitionWithDefault[key] = { kind: PropertyTypeKinds.Object, defaultValue: merged }
        } catch (err) {
          if (err instanceof Error) {
            const cause = err?.cause as { key?: string }
            if (cause?.key != undefined) {
              throw new Error("Incompatible kinds", { cause: { key: `${key}.${cause?.key}`, definitionValue, defaultValue } })
            }
          }
          throw new Error("Unknown error", { cause: { key, definitionValue, defaultValue } })
        }
        break
      default:
        definitionWithDefault[key] = definition[key];
        break;
    }
  }
  return definitionWithDefault as T & D
}

function setDefaultValue<T extends SheetComponentPropertyType>(component: T): WithValue<T> {
  let _exhaustiveCheck: never;
  switch (component.kind) {
    case PropertyTypeKinds.Boolean:
    case PropertyTypeKinds.String:
    case PropertyTypeKinds.Number:
    case PropertyTypeKinds.Array:
    case PropertyTypeKinds.Enum:
      return Object.assign({}, component, { value: component.defaultValue }) as WithValue<T>
    case PropertyTypeKinds.Object:
      return Object.assign({}, component, { value: setDefaultValues(component.defaultValue) }) as WithValue<T>
    default:
      _exhaustiveCheck = component;
      return _exhaustiveCheck;
  }
}

function setDefaultValues<T extends SheetComponentPropertyTypeDefinition>(definition: T): SheetComponentProperties<T> {
  const properties = Object.entries(definition).reduce((acc: { [key: string]: SheetComponentPropertyType }, [key, value]) => {
    return Object.assign(acc, { [key]: setDefaultValue(value) }) as { [key in keyof (T)]: WithValue<T[key]> }
  }, {})
  return properties as SheetComponentProperties<T>
}


export function getDefault(componentType: SheetComponentType): SheetComponent {
  const testComponent: SheetComponent<typeof componentType.propertyTypes> = {
    name: componentType.name,
    properties: setDefaultValues(mergeObjectSheetComponentDefaults(defaultProperties, componentType.propertyTypes))
  };
  return testComponent
}


export function componentTypesToModels(compTypes: SheetComponentType[]): SheetComponent[] {
  return compTypes.map(getDefault)
}
//#endregion
