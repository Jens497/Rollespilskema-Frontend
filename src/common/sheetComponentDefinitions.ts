import imgUrl from '@/assets/logo.png';
import { type CommonProperties, commonProperties, CommonPropertiesOverrides } from "@/common/sheetComponentProperties/Common"
import { properties as labelProperties } from "@/common/sheetComponentProperties/Label"
import LabelComponent from "@/components/templateEditor/sheet-components/LabelComponent.vue"
import { properties as boxProperties, commonOverrides as boxCommonOverrides } from "@/common/sheetComponentProperties/Box"
import BoxComponent from "@/components/templateEditor/sheet-components/BoxComponent.vue"
import { DefineComponent } from 'vue';
import { DefinitionWithValue, ObjectSheetComponentPropertyFields, PartialProperty, PartialPropertyDefinition, PropertyTypeKinds, SheetComponentPropertyType, WithValue, objectProperty } from './sheetComponent';

export type SheetComponentPropertyTypeDefinition = ObjectSheetComponentPropertyFields;
export type SheetComponentProperties<T extends SheetComponentPropertyTypeDefinition> = T extends any ? DefinitionWithValue<T> : never;

export interface SheetComponentType<T extends SheetComponentPropertyTypeDefinition = SheetComponentPropertyTypeDefinition> {
  readonly name: keyof ComponentTypeFieldsMap
  image: string
  readonly propertyTypes: {
    common: CommonPropertiesOverrides,
    internal: T
  }
  vueComponent?: DefineComponent<unknown, unknown, any>
}

export interface SheetComponent<T extends SheetComponentPropertyTypeDefinition = SheetComponentPropertyTypeDefinition> {
  name: keyof ComponentTypeFieldsMap
  properties: {
    common: SheetComponentProperties<CommonProperties>,
    internal: SheetComponentProperties<T>
  }
}

export const COMPONENT_TYPE_MAP = {
  "Box": {
    image: imgUrl,
    propertyTypes: { internal: boxProperties, common: boxCommonOverrides },
    vueComponent: BoxComponent
  },
  "Label": {
    image: imgUrl,
    propertyTypes: { internal: labelProperties, common: {} },
    vueComponent: LabelComponent
  },
  "Text Input": {
    image: imgUrl,
    propertyTypes: { internal: {}, common: {} },
    vueComponent: undefined
  },
  "Line": {
    image: imgUrl,
    propertyTypes: { internal: {}, common: {} },
    vueComponent: undefined
  },
  "Image": {
    image: imgUrl,
    propertyTypes: { internal: {}, common: {} },
    vueComponent: undefined
  },
  "Info Circle": {
    image: imgUrl,
    propertyTypes: { internal: {}, common: {} },
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
function mergeDefaults<D extends SheetComponentPropertyTypeDefinition, T extends PartialPropertyDefinition<D>>(defaults: D, overrides: T): D {
  const defaultsWithOverrides: SheetComponentPropertyTypeDefinition = {}
  for (const key in defaults) {
    const defaultsValue = defaults[key]
    const overridesValue = overrides[key] as PartialProperty<SheetComponentPropertyType>



    if (overridesValue?.kind == undefined) {
      defaultsWithOverrides[key] = defaultsValue
    } else if (defaultsValue.kind != overridesValue?.kind) {
      throw new Error("Incompatible kinds", { cause: { key, defaultsValue, overridesValue } })
    } else if (overridesValue.kind != PropertyTypeKinds.Object) {
      defaultsWithOverrides[key] = overridesValue
    } else if (defaultsValue.kind == PropertyTypeKinds.Object) {
      defaultsWithOverrides[key] = objectProperty(mergeDefaults(defaultsValue.defaultValue, overridesValue.defaultValue))
    }
  }
  return defaultsWithOverrides as D
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
  const testComponent: SheetComponent<typeof componentType.propertyTypes.internal> = {
    name: componentType.name,
    properties: {
      common: setDefaultValues(mergeDefaults(commonProperties, componentType.propertyTypes.common)),
      internal: setDefaultValues(componentType.propertyTypes.internal)
    }
  };
  return testComponent
}


export function componentTypesToModels(compTypes: SheetComponentType[]): SheetComponent[] {
  return compTypes.map(getDefault)
}
//#endregion
