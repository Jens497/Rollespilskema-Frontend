import imgUrl from '@/assets/logo.png';
import { properties as labelProperties } from "@/common/sheetComponentProperties/Label"
import { SheetComponentType } from './sheetComponent';


const DEFAULT_COMPONENT_TYPE_MAP = {
  "Box": {
    image: imgUrl,
    propertyTypes: {},
  },
  "Label": {
    image: imgUrl,
    propertyTypes: labelProperties,
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


export const DEFAULT_COMPONENT_TYPES: SheetComponentType[] = Object.entries(DEFAULT_COMPONENT_TYPE_MAP).map(([k, v]) => ({ ...v, name: k }))

export type ComponentTypeFieldsMap = typeof DEFAULT_COMPONENT_TYPE_MAP
export type ComponentTypeFieldsList = typeof DEFAULT_COMPONENT_TYPES
