import { PartialPropertyDefinition, numberProperty, objectProperty } from "@/common/sheetComponent";

export const commonProperties = {
  pos: objectProperty({
    x: numberProperty(0),
    y: numberProperty(0),
  }),
  size: objectProperty({
    height: numberProperty(0),
    width: numberProperty(0),
  })
}

export type CommonProperties = typeof commonProperties;
export type CommonPropertiesOverrides = PartialPropertyDefinition<CommonProperties>

