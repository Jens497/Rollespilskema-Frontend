import { PropertyTypeKinds as Kind, SheetComponentPropertyTypeDefinition, numberProperty, objectProperty } from "@/common/sheetComponent";

export const properties = {
  pos: objectProperty({
    x: numberProperty(0),
    y: numberProperty(0),
  }),
  size: objectProperty({
    height: numberProperty(0),
    width: numberProperty(0),
  })
}

export type Properties = typeof properties;
