import imgUrl from '@/assets/logo.png';
import { properties as labelProperties } from "@/common/sheetComponentProperties/Label"
import { SheetComponentType } from './sheetComponent';
import LabelComponent from "@/components/templateEditor/sheet-components/LabelComponent.vue"

// TODO add The component to each template (and to SheetComponentType)
export const COMPONENT_TYPE_MAP = {
  "Box": {
    image: imgUrl,
    propertyTypes: {},
  },
  "Label": {
    image: imgUrl,
    propertyTypes: labelProperties,
    vueComponent: LabelComponent
  },
  "Text Input": {
    image: imgUrl,
    propertyTypes: {},
  },
  "Line": {
    image: imgUrl,
    propertyTypes: {},
  },
  "Image": {
    image: imgUrl,
    propertyTypes: {},
  },
  "Info Circle": {
    image: imgUrl,
    propertyTypes: {},
  },
} as const


export const COMPONENT_TYPES: SheetComponentType[] = Object.entries(COMPONENT_TYPE_MAP).map(([k, v]) => ({ ...v, name: k }))

export type ComponentTypeFieldsMap = typeof COMPONENT_TYPE_MAP
export type ComponentTypeFieldsList = typeof COMPONENT_TYPES
